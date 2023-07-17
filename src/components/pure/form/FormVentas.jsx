import { Form, Formik } from "formik"
import { useEffect, useState } from "react"
import { URL_CARTA } from "../../../api/api"
import { helpHttp } from "../../../utils/helpHttp"
import { InputCombo } from "../InputCombo"
import * as Yup from "yup";
import { Boton } from "../Boton"
import { Input } from "../Input"
import styles from "../../../styles/form-ventas.module.scss"
import { Alerta } from "../Alerta"

const formatoDetalles = {
    carta: {
        idCarta: 1
    }, 
    venta: {
        id: 1
    },
    cantidad: 1,
    precio: 1,
    total: 3
}

const initialValues = {
    carta: "",
    cantidad: ""
}

export const FormVentas = ({ pedidos, setPedidos, cartas, setCartas }) => {
    const [alerta, setAlerta] = useState({});
    const api = helpHttp();
    useEffect(() => {
        api.get(URL_CARTA)
            .then(res => {
                if (!res.err ) setCartas(res.data);
                else {
                    setAlerta({
                        texto: "Ocurrió un error de formato al tratar de obtener las cartas",
                        color: "rojo"
                    }) 
                }
            })
            .catch(err => {
                setAlerta({
                    texto: "Ocurrió un error al tratar de obtener las cartas",
                    color: "rojo"
                }) 
            })
    }, [])
    const enviarFormulario = (values, setSubmitting, resetForm) => {
        const { carta, cantidad } = values;
        const separador = carta.indexOf("-");
        const idCarta = parseInt(carta.substring(0, separador));
        const precio = parseFloat(carta.substring(separador + 1, carta.length))
        const total = precio * parseInt(cantidad);
        setPedidos([...pedidos, {
            carta: {
                idCarta
            },
            venta: {
                id: null
            },
            cantidad: parseInt(cantidad),
            precio,
            total
        }])
        setSubmitting(false);
        resetForm();
    }
    return (
        <Formik
            initialValues={ initialValues }
            validationSchema={ Yup.object({
                carta: Yup.string()
                                        .required("La carta es requerida."),
                cantidad: Yup.string()
                                    .matches(/^[0-9]{1,11}$/g, "La cantidad no es válida")
                                    .required("La cantidad es requerida.")
            }) }
            onSubmit={ (values, { setSubmitting, resetForm}) =>
                enviarFormulario(values, setSubmitting, resetForm) }
        >
            {({ isSubmitting }) => (
                <Form className={ styles["formulario"]}>
                    <InputCombo
                        label="Carta (*)"
                        name="carta"
                        defaultValue={ initialValues.carta }
                    >
                        <option value="">Seleccionar</option>
                        {
                            cartas.map(carta => (
                                <option 
                                    value={`${carta.idCarta}-${carta.precioCarta}` } 
                                    key={ carta.idCarta }
                                >
                                    { carta.nombreCarta }
                                </option>
                            ))
                        }
                    </InputCombo>
                    <Input
                        label="Cantidad (*)"
                        name="cantidad"
                        maxLength="11"
                        defaultValue={ initialValues.cantidad }
                    />
                    <div>
                        <Boton
                            texto="Agregar"
                            disabled={ isSubmitting }
                            type="submit"
                        />
                    </div>
                    <Alerta datos={ alerta } />
                </Form>
            )}
        </Formik>
    )
}
