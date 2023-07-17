import { Formik, Form } from "formik";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import *  as Yup from "yup";
import { URL_CARTA } from "../../../api/api";
import { helpHttp } from "../../../utils/helpHttp";
import { Boton } from "../Boton";
import { BtnRegresar } from "../BtnRegresar";
import { Cargador } from "../Cargador";
import { Input } from "../Input";
import styles from "../../../styles/form-carta.module.scss";
import { Alerta } from "../Alerta";

const initialValues = {
    nombreCarta: "",
    imagenCarta: "",
    descripcionCarta: "",
    precioCarta: ""
}

export const FormCarta = () => {
    const [alerta, setAlerta] = useState({});
    const [valoresIniciales, setValoresIniciales] = useState(initialValues);
    const api = helpHttp();
    const { idCarta } = useParams();
    useEffect(() => {
        if(idCarta) {
            api.get(`${URL_CARTA}/${idCarta}`)
                .then(res => {
                    if (res.status === 200) {
                        setValoresIniciales(res.data)
                    }
                })
                .catch(err => {
                    setAlerta({
                        texto: "Ocurrió un error al tratar de obtener los datos",
                        color: "rojo"
                    })
                })
        }
    }, [])
    const controlarEnvio = (values, setSubmitting, resetForm) => {
        const formatoValues = {
            nombreCarta: values.nombreCarta,
            descripcionCarta: values.descripcionCarta,
            imagenCarta: values.imagenCarta,
            precioCarta: parseFloat(values.precioCarta)
        }
        if (!idCarta) {
            api.post(URL_CARTA, { body: formatoValues })
                .then(res => {
                    if (res.status === 200) {
                        setAlerta({
                            texto: "La carta se registró correctamente",
                            color: "verde"
                        })
                    } else {
                        setAlerta({
                            texto: "Ocurrió un error de formato al tratar de registrar la carta",
                            color: "rojo"
                        })
                    }
                })
                .catch(err => {
                    setAlerta({
                        texto: "Ocurrió un error al tratar de registrar la carta",
                        color: "rojo"
                    })
                })
                .finally(() => {
                    resetForm();
                    setSubmitting(false);
                });
        } else {
            api.put(`${URL_CARTA}/${ idCarta }`, { body: formatoValues })
                .then(res => {
                    if (res.status === 200) {
                        setAlerta({
                            texto: "La carta se actualizó correctamente",
                            color: "verde"
                        })
                    } else {
                        setAlerta({
                            texto: "Ocurrió un error de formato al tratar de actualizar la carta",
                            color: "rojo"
                        })
                    }
                })
                .catch(err => {
                    setAlerta({
                        texto: "Ocurrió un error al tratar de actualizar la carta",
                        color: "rojo"
                    })
                })
                .finally(() => {
                    setSubmitting(false);
                })
        }
    }
    return (
        <Formik
            initialValues={ valoresIniciales}
            validationSchema={ Yup.object({
                nombreCarta: Yup.string()
                                        .min(3, "El nombre es demasiado corto")
                                        .max(50, "El nombre es demasiado grande")
                                        .required("El nombre es requerido"),
                imagenCarta: Yup.string()
                                        .max(255, "La imagen es demasiado grande"),
                descripcionCarta: Yup.string()
                                        .min(5, "La descripción es muy corta")
                                        .max(255, "La desripción es muy larga")
                                        .required("La descripción es requerida"),
                precioCarta: Yup.string()
                                        .matches(/^([0-9]{1,3}|[0-9]{1,3}\.[0-9]{1,3})$/, "El precio no es válido")
                                        .max(7, "El precio es demasiado grande")
                                        .required("El precio es requerido"),
            })}
            onSubmit={ (values, { setSubmitting, resetForm})=>
                controlarEnvio(values, setSubmitting, resetForm) 
            }
        >
            {({ isSubmitting }) =>(
                <Form className={ styles["contenedor"] }>
                    <Input
                        label="Nombre (*)"
                        name="nombreCarta"
                        maxLength="50"
                        defaultValue={ valoresIniciales.nombreCarta }
                    />
                    <Input
                        label="Descripción (*)"
                        name="descripcionCarta"
                        maxLength="255"
                        defaultValue={ valoresIniciales.descripcionCarta }
                    />
                    <Input
                        label="Imagen"
                        name="imagenCarta"
                        maxLength="255"
                        defaultValue={ valoresIniciales.imagenCarta }
                    />
                    <Input
                        label="Precio (*)"
                        name="precioCarta"
                        maxLength="7"
                        defaultValue={ valoresIniciales.precioCarta }
                    />
                    <div className={ styles["btn-contenedor"]}>
                        <BtnRegresar  />
                        <Boton 
                            type="submit"
                            texto={ !idCarta ? "Registrar" : "Guardar"}
                            disabled={ isSubmitting }
                        />
                    </div>
                    { isSubmitting && <Cargador /> }
                    <Alerta datos={ alerta } />
                </Form>
            )}
        </Formik>
    )
}
