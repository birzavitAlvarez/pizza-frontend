import { Formik, Form} from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import * as Yup from 'yup';
import { URL_PRODUCTOS, URL_PROVEEDORES } from '../../../api/api';
import { obtenerProductosFaltantes } from '../../../store/reducers/notificacionesReducer';
import { helpHttp } from '../../../utils/helpHttp';
import { Alerta } from '../Alerta';
import { Boton } from '../Boton';
import { BtnRegresar } from '../BtnRegresar';
import { Cargador } from '../Cargador';
import { Input } from '../Input';
import { InputCombo } from "../InputCombo";

let initialValues = {
    nombre: "",
    // cantidadProducto: "",
    claseProducto: "",
    unidadMedida: "",
    proveedor: ""
}
export const FormProductos = () => {
    const [alerta, setAlerta] = useState({});
    const dispatch = useDispatch();
    const api = helpHttp();
    const { idProducto } = useParams();
    const [valoresIniciales, setValoresIniciales] = useState(initialValues)
    const [proveedores, setProveedores] = useState([])
    const trabajador = useSelector(state => state.usuario);
    const listaProveedores = () => {
        api.get(URL_PROVEEDORES)
            .then(res => {
                if (res.status === 200) setProveedores(res.data)
            })
            .catch(err =>{
                setAlerta({
                    texto: "Ocurrió un error al tratar de obtener a los proveedores disponibles",
                    color: "rojo"
                })
            })
    }
    useEffect(() => {
        listaProveedores();
        if (idProducto){
            api.get(`${URL_PRODUCTOS}/${ idProducto }`)
                .then(res => {
                    if (res.status === 200) {
                        const valoresFiltrados = {
                            ...res.data,
                            nombreProveedor: res.data.idProveedor
                        }
                        setValoresIniciales(valoresFiltrados);
                    }
                    else window.history.back();
                })
                .catch(err => null)
        }
    }, [])
    const textoEnviar = !idProducto ? "Registrar" : "Guardar"
    
    const controlarEnvio  = (values, setSubmitting, resetForm) => {
        const formatoValues = {
            nombre: values.nombre,
            cantidadProducto: 0,
            unidadMedida: values.unidadMedida,
            claseProducto: values.claseProducto,
            proveedor: {
                id: parseInt(values.proveedor)
            },
            trabajador: {
                // id: trabajador.idTrabajador
                id: 1
            }
        }
        if (!idProducto) {
            api.post(URL_PRODUCTOS, { body: formatoValues })
                .then(res => {
                    if (res.status === 200) {
                        setAlerta({
                            texto: "El producto fue registrado de forma existosa",
                            color: "verde"
                        })
                        dispatch(obtenerProductosFaltantes())
                    } else {
                        setAlerta({
                            texto: "Ocurrió un error de formato al registrar el producto",
                            color: "rojo"
                        })
                    }
                })
                .catch(err => {
                    setAlerta({
                        texto: "Ocurrió un error al registrar el producto",
                        color: "rojo"
                    })
                })
                .finally(() => {
                    resetForm();
                })
        } else {
            api.put(`${URL_PRODUCTOS}/${ idProducto }`, { body: formatoValues})
            .then(res => {
                    if (res.status === 200) {
                        setAlerta({
                            texto: "El producto fue actualizado de forma existosa",
                            color: "verde"
                        })
                        dispatch(obtenerProductosFaltantes())
                    } else {
                        setAlerta({
                            texto: "Ocurrió un error de formato al actualizar el producto",
                            color: "rojo"
                        }) 
                    }
                })
                .catch(err => {
                    setAlerta({
                        texto: "Ocurrió un error al actualizar el producto",
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
                nombre: Yup.string()
                                    .min(1, "El nombre es demasiado corto.")
                                    .max(20, "El nombre es demasiado grande.")
                                    .required("El nombre es requerido."),
                claseProducto: Yup.string()
                                    .matches(/^(perecible|no\ perecible)$/, "La clase debe ser \"perecible\" o \"no perecible\".")
                                    .required("La clase es requerida.."),
                unidadMedida: Yup.string()
                                    .required("La unidad de medida es requerida."),
                proveedor: Yup.string()
                                    .required("El proveedor es requerido."),
            }) }
            onSubmit={ (values, { setSubmitting, resetForm})=>
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
                            {/* <Input
                                label="Cantidad (*)"
                                name="cantidadProducto"
                                maxLength="9"
                                defaultValue={ valoresIniciales.cantidadProducto }
                            /> */}
                            <InputCombo 
                                label="Clase (*)" 
                                name="claseProducto"
                                defaultValue={ valoresIniciales.claseProducto }
                            >
                                <option value="">Seleccionar</option>
                                <option value="perecible">Perecible</option>
                                <option value="no perecible">No perecible</option>
                            </InputCombo>
                            <InputCombo 
                                label="Unidad de medida (*)" 
                                name="unidadMedida"
                                defaultValue={ valoresIniciales.unidadMedida }
                            >
                                <option value="">Seleccionar</option>
                                <option value="kg">Kilos</option>
                                <option value="gr">Gramos</option>
                                <option value="u">Unidad</option>
                            </InputCombo>
                            <InputCombo 
                                label="Proveedor (*)" 
                                name="proveedor"
                                defaultValue={ valoresIniciales.nombreProveedor }
                            >
                                <option value="">Seleccionar</option>
                                {
                                    proveedores.map(proveedor => (
                                        <option 
                                            key={ Math.random() }
                                            value={proveedor.id}
                                        >
                                            { proveedor.nombreP }
                                        </option>
                                    ))
                                }
                            </InputCombo>
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
