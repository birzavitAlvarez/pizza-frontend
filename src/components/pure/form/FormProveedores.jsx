import { Formik, Form} from 'formik';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import * as Yup from 'yup';
import { URL_PROVEEDORES } from '../../../api/api';
import { helpHttp } from '../../../utils/helpHttp';
import { Alerta } from '../Alerta';
import { Boton } from '../Boton';
import { BtnRegresar } from '../BtnRegresar';
import { Cargador } from '../Cargador';
import { Input } from '../Input';
import { InputNumber } from '../InputNumber';

let initialValues = {
    nombreP: "",
    ruc: "",
    direccion: "",
    telefono: "",
    correo: ""
}

export const FormProveedores = () => {
    const api = helpHttp();
    const { id } = useParams();
    const [valoresIniciales, setValoresIniciales] = useState(initialValues)
    const [alerta, setAlerta] = useState({})
    useEffect(() => {
        if (id){
            api.get(`${URL_PROVEEDORES}/${ id }`)
                .then(res => { 
                    if (res.status === 200) setValoresIniciales(res.data);
                    else window.history.back();
                })
                .catch(err => null)
        }
    }, [])
    const textoEnviar = !id ? "Registrar" : "Guardar"
    const controlarEnvio  = (values, setSubmitting, resetForm) => {
        if (!id) {
            api.post(URL_PROVEEDORES, { body: values })
                .then(res => {
                    res.status === 200
                        ? setAlerta({
                            texto: "El proveedor fue registrado de forma existosa.",
                            color: "verde"
                        })
                        : setAlerta({
                            texto: "Ocurrió un error al registrar al proveedor.",
                            color: "rojo"
                        })
                })
                .catch(err => {
                    setAlerta({
                        texto: "Ocurrió un error al registrar al proveedor.",
                        color: "rojo"
                    })
                })
                .finally(() => {
                    resetForm();
                })
        } else {
            api.put(`${URL_PROVEEDORES}/${ id }`, { body: values })
                .then(res => {
                    res.status === 200
                        ? setAlerta({
                            texto: "Proveedor modificado exitosamente",
                            color: "verde"
                        })
                        : setAlerta({
                            texto: "Ocurrió un error en el formato al modificar al proveedor.",
                            color: "rojo"
                        })
                })
                .catch(err => {
                    setAlerta({
                        texto: "Ocurrió un error al modificar al proveedor.",
                        color: "rojo"
                    })
                })
        }
        setSubmitting(false);
    }
    return (
        <Formik
            initialValues={ valoresIniciales }
            validationSchema={ Yup.object({
                nombreP: Yup.string()
                                    .min(2, "El nombre es demasiado corto.")
                                    .max(100, "El nombre es demasiado grande.")
                                    .required("El nombre es requerido."),
                ruc: Yup.string()
                            .matches(/^[0-9]{11}$/, "El ruc es inválido.")
                            .max(11, "El ruc es demasido largo")
                            .required("El ruc es requerido."),
                direccion: Yup.string()
                                    .min(2, "Direccion demasiado corta.")
                                    .max(50, "Dirección demasiado larga.")
                                    .required("La dirección es requerida."),
                telefono: Yup.string()
                                    .matches(
                                        /^([0-9]{9}|\d{3} \d{3} \d{3}|\d{3}-\d{3}-\d{3}|\+?\d \d{3} \d{3} \d{3}|\+?\d{2} \d{3} \d{3} \d{3}|\+?\d \d{3}-\d{3}-\d{3}|\+?\d{2} \d{3}-\d{3}-\d{3}|\+?\d \(\d{3}\) \d{3}-\d{4})$/g,
                                        "El teléfono no tiene un formato válido."
                                    )
                                    .max(20, "El teléfono es demasiado largo.")
                                    .required("El teléfono es requerido."),
                correo: Yup.string()
                                .email("Formato de email inválido.")
                                .max(50, "El correo es demasiado largo.")
            }) }
            onSubmit={ (values, { setSubmitting, resetForm})=>
                controlarEnvio(values, setSubmitting, resetForm) }
        >
            {({ isSubmitting }) => (
                <Form className="formulario">
                    <Input 
                        label="Nombre (*)"
                        name="nombreP"
                        maxLength="100"
                        defaultValue={ valoresIniciales.nombreP }
                        />
                    <InputNumber
                        label="RUC (*)"
                        name="ruc"
                        maxLength={ 11 }
                        defaultValue={ valoresIniciales.ruc }
                        />
                    <Input 
                        label="Direccion (*)"
                        name="direccion"
                        maxLength="50"
                        defaultValue={ valoresIniciales.direccion }
                        />
                    <Input
                        label="Teléfono (*)"
                        name="telefono"
                        maxLength="20"
                        type="tel"
                        defaultValue={ valoresIniciales.telefono }
                        />
                    <Input 
                        label="Email"
                        name="correo"
                        type="email"
                        maxLength="50"
                        defaultValue={ valoresIniciales.correo }
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
