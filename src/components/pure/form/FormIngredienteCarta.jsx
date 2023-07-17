import { Formik, Form} from 'formik';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import * as Yup from 'yup';
import { URL_CARTA, URL_INGREDIENTES, URL_PRODUCTOS, URL_PROVEEDORES } from '../../../api/api';
import { helpHttp } from '../../../utils/helpHttp';
import { Alerta } from '../Alerta';
import { Boton } from '../Boton';
import { BtnRegresar } from '../BtnRegresar';
import { Cargador } from '../Cargador';
import { Input } from '../Input';
import { InputCombo } from '../InputCombo';

let initialValues = {
    nombreProducto: "",
    cantidadProducto: ""
}

export const FormIngredienteCarta = () => {
    const api = helpHttp();
    const { idCarta, idIngrediente } = useParams();
    const [valoresIniciales, setValoresIniciales] = useState(initialValues)
    const [productos, setProductos] = useState([]);
    const [alerta, setAlerta] = useState({})
    const listarProductos = () => {
        api.get(URL_PRODUCTOS)
            .then(res => {
                if (res.status === 200) {
                    api.get(`${URL_CARTA}/${ idCarta }`)
                        .then(res2 => {
                            if (res2.status === 200) {
                                const ingredientesUsados = res2.data.ingredientes
                                    .map(ingrediente => ingrediente.nombreProducto)
                                const ingredientes = res.data.filter(ingrediente => {
                                    return !ingredientesUsados.includes(ingrediente.nombre)
                                })
                                setProductos(ingredientes)
                            }
                        })
                }
            })
    }
    useEffect(() => {
        listarProductos();
        if (idIngrediente){
            api.get(`${URL_INGREDIENTES}/${ idIngrediente }`)
                .then(res => { 
                    console.log(res)
                    if (res.status === 200) setValoresIniciales(res.data);
                    else window.history.back();
                })
                .catch(err => null)
        }
    }, [])
    const textoEnviar = !idIngrediente ? "Registrar" : "Guardar"
    const controlarEnvio  = (values, setSubmitting, resetForm) => {
        const formatoValues = {
            nombreProducto:values.nombreProducto,
            carta: { idCarta: parseInt(idCarta) },
            cantidadProducto: parseFloat(values.cantidadProducto)
        }
        if (!idIngrediente) {
            api.post(URL_INGREDIENTES, { body: formatoValues })
                .then(res => {
                    if (res.status === 200) {
                        setAlerta({
                            texto: "El ingrediente fue registrado de forma existosa.",
                            color: "verde"
                        });
                        listarProductos();
                    } else {
                        setAlerta({
                            texto: "Ocurrió un error de formato al registrar el ingrediente.",
                            color: "rojo"
                        })
                    }
                })
                .catch(err => {
                    setAlerta({
                        texto: "Ocurrió un error al registrar el ingrediente",
                        color: "rojo"
                    })
                })
                .finally(() => {
                    resetForm();
                    setSubmitting(false);
                })
        } else {
            api.put(`${URL_INGREDIENTES}/${ idIngrediente }`, { body: formatoValues })
                .then(res => {
                    res.status === 200
                        ? setAlerta({
                            texto: "Ingrediente modificado exitosamente",
                            color: "verde"
                        })
                        : setAlerta({
                            texto: "Ocurrió un error en el formato al modificar el ingrediente",
                            color: "rojo"
                        })
                })
                .catch(err => {
                    setAlerta({
                        texto: "Ocurrió un error al modificar el ingrediente",
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
            initialValues={ valoresIniciales }
            validationSchema={ Yup.object({
                nombreProducto: Yup.string()
                                    .required("El ingrediente es requerido."),
                cantidadProducto: Yup.string()
                                    .matches(/^([0-9]{1,5}|[0-9]{1,5}\.[0-9]{1,3})$/, "La cantidad no tiene un formato válido")
                                    .required("La cantidad es requerida.")
            }) }
            onSubmit={ (values, { setSubmitting, resetForm})=>
                controlarEnvio(values, setSubmitting, resetForm) }
        >
            {({ isSubmitting }) => (
                <Form className="formulario">
                    {
                        !idIngrediente 
                            ? (
                                <InputCombo
                                    label="Ingrediente (*)"
                                    name="nombreProducto"
                                    defaultValue={ valoresIniciales.nombreProducto }
                                >
                                    <option value="">Seleccionar</option>
                                    {
                                        productos.map(producto => (
                                            <option 
                                                key={ producto.id }
                                                value={ producto.nombre }
                                            >
                                                { producto.nombre }
                                            </option>
                                        ))
                                    }
                                </InputCombo>
                            )
                            : (
                                <Input
                                    label=""
                                    name="nombreProducto"
                                    defaultValue={ valoresIniciales.nombreProducto }
                                    style={{
                                        display: "none"
                                    }}
                                />
                            )
                    }
                    <Input 
                        label="Cantidad (*)"
                        name="cantidadProducto"
                        maxLength="9"
                        defaultValue={ valoresIniciales.cantidadProducto }
                        />
                    <div className="botones">
                        <BtnRegresar />
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
