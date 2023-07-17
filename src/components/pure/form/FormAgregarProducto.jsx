import { Formik, Form} from 'formik';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import * as Yup from 'yup';
import { URL_PRODUCTOS } from '../../../api/api';
import { obtenerProductosFaltantes } from '../../../store/reducers/notificacionesReducer';
import { helpHttp } from '../../../utils/helpHttp';
import { Alerta } from '../Alerta';
import { Boton } from '../Boton';
import { BtnRegresar } from '../BtnRegresar';
import { Cargador } from '../Cargador';
import { Input } from '../Input';

let initialValues = {
    cantidadProducto: ""
}
export const FormAgregarProducto = () => {
    const [alerta, setAlerta] = useState({});
    const api = helpHttp();
    const { idProducto } = useParams();
    const dispatch = useDispatch();
    const controlarEnvio  = (values, setSubmitting, resetForm) => {
        const formatoValues = {
            cantidadProducto: parseFloat(values.cantidadProducto)
        }
        api.put(`${ URL_PRODUCTOS }/cantidad/${ idProducto }`, { body: formatoValues })
            .then(res => {
                if (res.status === 200) {
                    setAlerta({
                        texto: "Se agregó la cantidad de forma exitosa.",
                        color: "verde"
                    })
                    dispatch(obtenerProductosFaltantes())
                } else {
                    setAlerta({
                        texto: "Ocurrió un error de formato, no se guardaron los cambios,",
                        color: "rojo"
                    })
                }
            })
            .catch(err => {
                setAlerta({
                    texto: "Ocurrió un error al tratar de añadir la cantidad",
                    color: "rojo"
                })
            })
            .finally(() => {
                resetForm();
            })
        setSubmitting(false);
    }

    return (
        <Formik
            initialValues={ initialValues }
            validationSchema={ Yup.object({
                cantidadProducto: Yup.string()
                                    .matches(/^([0-9]{1,5}|[0-9]{1,5}\.[0-9]{1,3})$/, "La cantidad no tiene un formato válido")
                                    .max(12, "La cantidad es demasiado grande.")
                                    .required("La cantidad es requerida."),
            }) }
            onSubmit={ (values, { setSubmitting, resetForm})=>
                controlarEnvio(values, setSubmitting, resetForm) }
        >
            {({ isSubmitting }) => (
                        <Form className="formulario">
                            <Input
                                label="Cantidad (*)"
                                name="cantidadProducto"
                                maxLength="9"
                                defaultValue={ initialValues.cantidadProducto }
                            />
                            <div className="botones">
                                <BtnRegresar />
                                <Boton 
                                    type="submit" 
                                    disabled={ isSubmitting }
                                    texto={ "Agregar" }
                                />
                            </div>
                            { isSubmitting && <Cargador /> }
                            <Alerta datos={ alerta } />
                        </Form>
                    )}
        </Formik>
    )
}
