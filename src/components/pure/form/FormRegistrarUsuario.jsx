import { useEffect, useState } from "react";
import { helpHttp } from "../../../utils/helpHttp";
import { Formik, Form} from 'formik';
import * as Yup from 'yup';
import { Input } from "../Input";
import { Alerta } from "../Alerta";
import { Cargador } from "../Cargador";
import { BtnRegresar } from "../BtnRegresar";
import { Boton } from "../Boton";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../store/reducers/userReducer";
import { URL_USUARIO } from "../../../api/api";

const initialValues = {
    usuario: "",
    contrasena: ""
}

export const FormRegistrarUsuario = () => {
    const [valoresIniciales, setValoresIniciales] = useState(initialValues)
    const [alerta, setAlerta] = useState({});
    const usuario = useSelector(state => state.usuario);
    const dispatch = useDispatch();
    const api = helpHttp();

    useEffect(()=>{
        setValoresIniciales({
            usuario: usuario.usuario,
            contrasena: usuario.contrasena
        })
    }, [])

    const textoEnviar = !usuario.id ? "Registrar" : "Guardar"
    const controlarEnvio  = (values, setSubmitting, resetForm) => {
        if (!usuario.id) {
            api.post(URL_USUARIO, {
                 body: {
                     ...values, 
                     rol: { 
                         id: 1
                    } }
                })
                .then(res => {
                    res.status === 200 
                        ? setAlerta({
                            texto: "Te has registrado correctamente",
                            color: "verde"
                        })
                        : setAlerta({
                            texto: "El usuario especificado no se puede registrar",
                            color: "rojo"
                        })
                })
                .catch(err => {
                    setAlerta({
                        texto: "Ocurrió un error al tratar de registrarte",
                        color: "rojo"
                    })
                })
                .finally(() => {
                    setSubmitting(false)
                    resetForm();
                })
        } else {
            api.put(`${URL_USUARIO}/${usuario.id}`, {
                body: {
                    usuario: values.usuario,
                    contrasena: values.contrasena,
                    rol: {
                        id: usuario.idRol
                    }
                }
            })
                .then(res => {
                    if (res.status === 200) {
                        dispatch(setUser({
                            data: {
                                ...usuario,
                                ...values,
                            }
                        }))
                        setAlerta({
                            texto: "Los cambios han sido guardados",
                            color: "verde"
                        })
                    } else {
                        setAlerta({
                            texto: "Ocurrió un error de formato, no se pudieron guardar los cambios",
                            color: "rojo"
                        })
                    }
                })
                .catch(err => {
                    setAlerta({
                        texto: "Ocurrió un error, no se pudieron guardar los cambios",
                        color: "rojo"
                    })
                })
                .finally(() => setSubmitting(false));
        }
    }

    return (
        <Formik
            initialValues={ valoresIniciales }
            validationSchema={ Yup.object({
                usuario: Yup.string()
                                    .min(2, "El usuario es demasiado corto.")
                                    .max(15, "El usuario es demasiado largo.")
                                    .required("El usuario es requerido."),
                contrasena: Yup.string()
                            .min(5, "La contraseña es demasiado corta.")
                            .max(70, "La contraseña es demasiado larga")
                            .required("La contraseña es requerida.")
            }) }
            onSubmit={ (values, { setSubmitting, resetForm})=>
                controlarEnvio(values, setSubmitting, resetForm) }
        >
            {({ isSubmitting }) => (
                <Form className="formulario">
                    <Input
                        label="Usuario (*)"
                        name="usuario"
                        maxLength="15"
                        defaultValue={ valoresIniciales.usuario }
                    />
                    <Input 
                        label="Contraseña (*)"
                        name="contrasena"
                        type="password"
                        maxLength="70"
                        defaultValue={ valoresIniciales.contrasena }
                    />
                    <div className="botones">
                        <BtnRegresar/>
                        <Boton 
                            type="submit" 
                            disabled={ isSubmitting }
                            texto={ textoEnviar }
                        />
                    </div>
                    { isSubmitting && <Cargador /> }
                    <Alerta datos={ alerta }/>
                </Form>
            )}
        </Formik>
    )
}
