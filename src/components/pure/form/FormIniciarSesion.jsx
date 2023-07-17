import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { helpHttp } from "../../../utils/helpHttp";
import { Formik, Form} from 'formik';
import * as Yup from 'yup';
import { Input } from "../Input";
import { Alerta } from "../Alerta";
import { Cargador } from "../Cargador";
import { Boton } from "../Boton";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../store/reducers/userReducer";
import { URL_USUARIO } from "../../../api/api";

const initialValues = {
    usuario: "",
    contrasena: ""
}

export const FormIniciarSesion = () => {
    const [alerta, setAlerta] = useState({});
    const dispatch = useDispatch();

    const api = helpHttp();

    const [valoresIniciales, setValoresIniciales] = useState(initialValues)
    const navigate = useNavigate();
    const usarAlerta = (texto, color) =>{
        setAlerta(true)
        setTextoAlerta(texto)
        setColorAlerta(color)
        setTimeout(() => {
            setAlerta(false)
        }, 5050);
    }
    const controlarEnvio  = (values, setSubmitting) => {
        api.post(`${URL_USUARIO}/login`, { body: values })
            .then(res => {
                if(res.status === 200) {
                    dispatch(setUser({
                        data: res.data
                    }));
                    sessionStorage.setItem("usuario", res.data.id)
                    navigate("/");
                } else {
                    setAlerta({
                        texto: "No se encontró al usuario especificado",
                        color: "rojo"
                    })
                }
            })
            .catch(err => {
                usarAlerta("Ocurrió un error en el envío de los datos", "rojo");
            })
            .finally(() => setSubmitting(false));
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
                <Form className="formulario" style={{ margin: "0 auto" }}>
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
                        <Boton 
                            type="submit" 
                            disabled={ isSubmitting }
                            className="boton rojo"
                            style={{  marginTop: "var(--step-0)"}}
                            texto="Ingresar"
                        />
                    </div>
                    { isSubmitting && <Cargador /> }
                    <Alerta datos={ alerta } />
                </Form>
            )}
        </Formik>
    )
}
