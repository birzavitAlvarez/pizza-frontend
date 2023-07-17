import { useEffect, useState } from "react"
import { URL_PRODUCTOS } from "../../api/api"
import { helpHttp } from "../../utils/helpHttp"
import "../../styles/listarProductos.scss";
import { Link, useNavigate } from "react-router-dom"
import { Buscador } from "../../components/pure/form/Buscador"
import { useDispatch, useSelector } from "react-redux";
import { setQuestion, setResetQuestion } from "../../store/reducers/confirmReducer";
import { TablaProductos } from "../../components/container/TablaProductos";
import { obtenerProductosFaltantes } from "../../store/reducers/notificacionesReducer";

export const ListarProductos = () => {
    const [productos, setProductos] = useState([])
    const [filtro, setFiltro] = useState("");
    const api = helpHttp();
    const navigate = useNavigate();
    const confirmarState = useSelector(state => state.confirmar)
    const dispatch = useDispatch();

    const listarProductos = async () => {
        api.get(URL_PRODUCTOS)
            .then(res => { 
                if (res.status === 200) {
                    setProductos(res.data)
                    dispatch(obtenerProductosFaltantes())
                }
            })
            .catch(err => null);
    }

    useEffect(() => { 
        listarProductos() 
    }, [])

    useEffect(()=> {
        if(confirmarState.respondido === true) {
            if(confirmarState.confirmar) confirmarAccion(confirmarState.data.id);
            else dispatch(setResetQuestion());
        }
    }, [confirmarState.respondido])

    const editarProducto = ({ id }) => {
        navigate(`/productos/${id}`)
    }

    const eliminarProducto = (producto) => {
        dispatch(setQuestion({
            mostrar: true,
            titulo: "Eliminar producto",
            mensaje: `¿Estás seguro de que quieres eliminar "${producto.nombre}" de tus productos?`,
            data: producto
        }))
    }

    const confirmarAccion = id => {
        dispatch(setResetQuestion());
        api.del(`${URL_PRODUCTOS}/${ id }`)
            .then(res => res.status === 200 && listarProductos())
            .catch(err => console.log("error:", err));
    }
    
    const formatoRegistro = registro => [
        registro.nombreProveedor,
        registro.nombre,
        registro.claseProducto
    ]

    return (
        <div className="contenedor">
            <h1>Productos</h1>
            <Buscador
                datos={ productos }
                setFiltro={ setFiltro }
                campos={ ["nombre"] }
            />
            <Link to="/productos/registrar" >Registrar producto</Link>
            <TablaProductos
                titulos={
                    ["Proveedor",  "Producto", "Clase", "Opciones"]
                }
                registros={ filtro }
                editarRegistro={ editarProducto }
                eliminarRegistro={ eliminarProducto }
                formatoRegistro={ formatoRegistro }
                agregarRegistro={ registro => 
                    navigate(`/productos/${registro.id}/agregar`)}
            />
        </div>
    )
}
