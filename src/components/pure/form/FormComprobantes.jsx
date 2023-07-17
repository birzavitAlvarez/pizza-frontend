import { Formik, Form} from 'formik';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import * as Yup from 'yup';
import { URL_COMPROBANTES, URL_PRODUCTOS } from '../../../api/api';
import { helpHttp } from '../../../utils/helpHttp';
import { Alerta } from '../Alerta';
import { Boton } from '../Boton';
import { BtnRegresar } from '../BtnRegresar';
import { Cargador } from '../Cargador';
import { Input } from '../Input';
import { InputCombo } from '../InputCombo';
import { InputDate } from '../InputDate';
import styles from "../../../styles/pages/form-comprobantes.module.scss"

let initialValues = {
    idProducto: 0,
    totalCompro: "",
    fechaCompro: ""
}

export const FormComprobantes = () => {
    const api = helpHttp();
    const { idComprobante } = useParams();
    const [valoresIniciales, setValoresIniciales] = useState(initialValues)
    const [alerta, setAlerta] = useState({})
    const [productos, setProductos] = useState([]);
    useEffect(() => {
        api.get(URL_PRODUCTOS)
            .then(res => {
                res.status=== 200
                    ? setProductos(res.data)
                    : setAlerta({
                        texto: "Ocurrió un error al obtener a los productos.",
                        color: "rojo"
                    })
            })
            .catch(err => {
                setAlerta({
                    texto: "Ocurrió un error al obtener a los productos.",
                    color: "rojo"
                })
            })

        if (idComprobante){
            api.get(`${URL_COMPROBANTES}/${ idComprobante }`)
                .then(res => { 
                    if (res.status === 200) setValoresIniciales(res.data);
                    else window.history.back();
                })
                .catch(err => null)
        }
    }, [])
    const textoEnviar = !idComprobante ? "Registrar" : "Guardar"
    const controlarEnvio  = (values, setSubmitting, resetForm) => {
        const formatoValues = {
            totalCompro: parseFloat(values.totalCompro),
            producto: {
                id: parseInt(values.producto)
            },
            fechaCompro: values.fechaCompro
        }
        if (!idComprobante) {
            api.post(URL_COMPROBANTES, { body: formatoValues })
                .then(res => {
                    res.status === 200
                        ? setAlerta({
                            texto: "El comprobante fue registrado de forma existosa.",
                            color: "verde"
                        })
                        : setAlerta({
                            texto: "Ocurrió un error al registrar el comprobante.",
                            color: "rojo"
                        })
                })
                .catch(err => {
                    setAlerta({
                        texto: "Ocurrió un error al registrar el comprobante.",
                        color: "rojo"
                    })
                })
                .finally(() => {
                    resetForm();
                })
            api.post(`${ URL_PRODUCTOS }/cantidad/${ parseInt(values.producto) }`, {
                // cantidadProducto: 
            })
                .then(res => {

                })
                .catch()
                
        } else {
            api.put(`${URL_COMPROBANTES}/${ idComprobante }`, { body: formatoValues })
                .then(res => {
                    res.status === 200
                        ? setAlerta({
                            texto: "Comprobante modificado exitosamente",
                            color: "verde"
                        })
                        : setAlerta({
                            texto: "Ocurrió un error en el formato al modificar el comprobante.",
                            color: "rojo"
                        })
                })
                .catch(err => {
                    setAlerta({
                        texto: "Ocurrió un error al modificar el comprobante.",
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
                producto: Yup.string()
                                    .required("El producto es requerido."),
                totalCompro: Yup.string()
                            .matches(/^([0-9]{1,4}|[0-9]{1,4}\.[0-9]{1,2})$/,
                                 "El total es inválido.")
                            .max(7, "El total es demasido largo.")
                            .required("El total es requerido."),
                fechaCompro: Yup.date()
                                    .required("La fecha es requerida.")
            }) }
            onSubmit={ (values, { setSubmitting, resetForm})=>
                controlarEnvio(values, setSubmitting, resetForm) }
        >
            {({ isSubmitting }) => (
                <Form className="formulario">
                    <div>
                        <InputDate
                            label="Fecha (*)"
                            name="fechaCompro"
                            defaultValue={ valoresIniciales.fechaCompro }
                        />
                    </div>
                     {
                        !idComprobante
                            ? (
                            <InputCombo 
                                label="Producto (*)" 
                                id="producto"
                                name="producto"
                                defaultValue={ valoresIniciales.idProducto }
                            >
                                <option value="">Seleccionar</option>
                                {
                                    productos.map(producto => (
                                        <option 
                                            key={ Math.random() }
                                            value={ producto.id }
                                        >
                                            { producto.nombre }
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
                                    label="Producto (*)"
                                    name="producto"
                                    defaultValue={ valoresIniciales.idProducto }
                                />
                            </div>
                        )
                    }
                    <Input 
                        label="Total (*)"
                        name="totalCompro"
                        maxLength="7"
                        defaultValue={ valoresIniciales.totalCompro }
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
