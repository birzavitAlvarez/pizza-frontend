import { Formik, Form, Field} from 'formik';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import * as Yup from 'yup';
import { URL_TRABAJADORES, URL_USUARIO } from '../../../api/api';
import { helpHttp } from '../../../utils/helpHttp';
import { Alerta } from '../Alerta';
import { Boton } from '../Boton';
import { BtnRegresar } from '../BtnRegresar';
import { Cargador } from '../Cargador';
import { Input } from '../Input';
import { InputCombo } from "../InputCombo";
import { InputDate } from '../InputDate';

let initialValues = {
    nombre: "",
    apellido: "",
    edad: "",
    dni: "",
    telefono: "",
    correo: "",
    fechaAlta: "",
    fechaBaja: "",
    direccion: "",
    usuario: ""
}
export const FormTrabajadores= () => {
    const [alerta, setAlerta] = useState({});
    const api = helpHttp();
    const { idTrabajador } = useParams();
    const [valoresIniciales, setValoresIniciales] = useState(initialValues)
    const [usuarios, setUsuarios] = useState([]);
    useEffect(()=>{listarUsuarios()},[])
    useEffect(() => {
        if (idTrabajador){
            api.get(`${URL_TRABAJADORES}/${ idTrabajador }`)
                .then(res => { 
                    if (res.status === 200) setValoresIniciales(res.data);
                    else window.history.back();
                })
                .catch(err => null)
        }
    }, [])
    const textoEnviar = !idTrabajador ? "Registrar" : "Guardar"
    const controlarEnvio  = (values, setSubmitting, resetForm) => {
        const formatoValues = {
            ...values,
            edad: parseInt(values.edad),
            dni: parseInt(values.dni),
            usuario: {
                id: parseInt(values.usuario)
            }
        }
        if (!idTrabajador) {
            api.post(URL_TRABAJADORES, { body: formatoValues })
                .then(res => {
                    res.status === 200
                        ? setAlerta({
                            texto: "El trabajador se registró correctamente",
                            color: "verde"
                        }) 
                        : setAlerta({
                            texto: "Ocurrió un error de formato al registrar al trabajador",
                            color: "rojo"
                        }) 
                })
                .catch(err => {
                    setAlerta({
                        texto: "Ocurrió un error al registrar al trabajador",
                        color: "rojo"
                    }) 
                })
                .finally(() => {
                    resetForm();
                })
        } else {
            api.put(`${URL_TRABAJADORES}/${ idTrabajador }`, { body: formatoValues})
                .then(res => {
                    res.status === 200 
                        ? setAlerta({
                            texto: "El trabajador se actualizócorrectamente",
                            color: "verde"
                        }) 
                        : setAlerta({
                            texto: "Ocurrió un error de formato al actualizar al trabajador",
                            color: "rojo"
                        }) 
                })
                .catch(err => {
                    setAlerta({
                        texto: "Ocurrió un error al actualizar al trabajador.",
                        color: "rojo"
                    }) 
                })
        }
        setSubmitting(false);
        setTimeout(() => {
            listarUsuarios();
        }, 500);
    }

    const listarUsuarios = () => {
        api.get(URL_USUARIO+"/trabajadores")
            .then(res => {
                if (res.status === 200) setUsuarios(res.data)
            })
            .catch(err => null)
    }

    return (
        <Formik
            initialValues={ valoresIniciales }
            validationSchema={ Yup.object({
                nombre: Yup.string()
                                    .min(1, "El nombre es demasiado corto.")
                                    .max(20, "El nombre es demasiado grande.")
                                    .required("El nombre es requerido."),
                apellido: Yup.string()
                                    .min(1, "El apellido es demasiado corto.")
                                    .max(60, "El apellido es demasiado grande.")
                                    .required("El apellido es requerido."),
                edad: Yup.string()
                                    .matches(/^[0-9]{1,2}$/, "La edad no es válida.")
                                    .required("La edad es requerida"),
                dni: Yup.string()
                                .matches(/^[0-9]{8}$/, "El DNI no tiene un formato válido.")
                                .required("El DNI es requerido."),
                telefono: Yup.string()
                                .matches(
                                    /^([0-9]{9}|\d{3} \d{3} \d{3}|\d{3}-\d{3}-\d{3}|\+?\d \d{3} \d{3} \d{3}|\+?\d{2} \d{3} \d{3} \d{3}|\+?\d \d{3}-\d{3}-\d{3}|\+?\d{2} \d{3}-\d{3}-\d{3}|\+?\d \(\d{3}\) \d{3}-\d{4})$/g,
                                    "El teléfono no tiene un formato válido."
                                )
                                .max(20, "El teléfono es demasiado largo.")
                                .required("El teléfono es requerido."),
                correo: Yup.string()
                                .email("El correo no tiene un formato válido.")
                                .max(50, "El correo es demasiado largo")
                                .required("El correo es requerido."),
                fechaAlta: Yup.date()
                                .required("La fecha de alta es requerida."),
                fechaBaja: Yup.date(),
                direccion: Yup.string()
                                .min(4, "La dirección es demasiado corta.")
                                .max(200, "La dirección es demasiado larga.")
                                .required("La dirección es requerida."),
                usuario: Yup.string()
                                    .required("El usuario es requerido."),
            }) }
            onSubmit={ (values, { setSubmitting, resetForm}) =>
                controlarEnvio(values, setSubmitting, resetForm) }
        >
            {({ isSubmitting }) => (
                        <Form className="formulario">
                            <Input 
                                label="Nombre (*)"
                                name="nombre"
                                maxLength="20"
                                defaultValue={ valoresIniciales.nombre }
                            />
                            <Input 
                                label="Apellido (*)"
                                name="apellido"
                                maxLength="60"
                                defaultValue={ valoresIniciales.apellido }
                            />
                            <Input 
                                label="Edad (*)"
                                name="edad"
                                maxLength="2"
                                defaultValue={ valoresIniciales.edad }
                            />
                            <Input 
                                label="DNI (*)"
                                name="dni"
                                maxLength="8"
                                defaultValue={ valoresIniciales.dni }
                            />
                            <Input 
                                label="TeléfonoI (*)"
                                name="telefono"
                                maxLength="20"
                                defaultValue={ valoresIniciales.telefono }
                            />
                            <Input 
                                label="Correo (*)"
                                name="correo"
                                maxLength="50"
                                defaultValue={ valoresIniciales.correo }
                            />
                            <Input 
                                label="Dirección (*)"
                                name="direccion"
                                maxLength="200"
                                defaultValue={ valoresIniciales.direccion }
                            />
                            <div
                                style={{
                                    display: "flex",
                                    width: "100%",
                                    flexWrap: "wrap",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: "var(--step-3)"
                                }}
                            >
                                <InputDate
                                    label="Fecha alta (*)"
                                    name="fechaAlta"
                                    defaultValue={ valoresIniciales.fechaAlta }
                                />
                                <InputDate
                                    label="Fecha baja"
                                    name="fechaBaja"
                                    defaultValue={ valoresIniciales.fechaBaja }
                                />
                            </div>
                            {
                                !idTrabajador 
                                    ? (
                                    <InputCombo 
                                        label="Usuario (*)" 
                                        id="usuario"
                                        name="usuario"
                                        defaultValue={ valoresIniciales.idUsuario }
                                    >
                                        <option value="">Seleccionar</option>
                                        {
                                            usuarios.map(usuario => (
                                                <option 
                                                    key={ Math.random() }
                                                    value={usuario.id}
                                                >
                                                    {usuario.usuario}
                                                </option>
                                            ))
                                        }
                                    </InputCombo>
                                )
                                : (
                                    <div 
                                        style={{
                                            maxWidth: "0",
                                            maxHeight: "0",
                                            overflow: "hidden"
                                        }}
                                    >
                                        <Input 
                                            label="Usuario (*)"
                                            name="usuario"
                                            defaultValue={ valoresIniciales.idUsuario }
                                        />
                                    </div>
                                )
                            }
                            <div className="botones">
                                <BtnRegresar />
                                <Boton 
                                    type="submit" 
                                    disabled={ isSubmitting }
                                    texto={ textoEnviar }
                                />
                            </div>
                            { isSubmitting && <Cargador /> }
                            <Alerta datos={ alerta } />
                        </Form>
                    )}
        </Formik>
    )
}
