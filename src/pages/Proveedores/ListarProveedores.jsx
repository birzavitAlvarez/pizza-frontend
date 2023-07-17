import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { helpHttp } from "../../utils/helpHttp"
import { useNavigate } from "react-router";
import "../../styles/listarProveedor.scss"
import { URL_PROVEEDORES } from "../../api/api";
import { Tabla } from "../../components/container/Tabla";
import { Buscador } from "../../components/pure/form/Buscador";
import { useDispatch, useSelector } from "react-redux";
import { setQuestion, setResetQuestion } from "../../store/reducers/confirmReducer";

export const ListarProveedores = () => {
    const [proveedores, setProveedores] = useState([])
    const [filtro, setFiltro] = useState([]);
    const dispatch = useDispatch();
    const confirmarState = useSelector (state => state.confirmar)
    const navigate = useNavigate();
    const api = helpHttp();

    const listarProveedores = async () => {
        api.get(URL_PROVEEDORES)
            .then(res => res.status === 200 && setProveedores(res.data))
            .catch(err => null);
    }

    useEffect(() => { 
        listarProveedores() 
    }, [])

    useEffect(()=> {
        if(confirmarState.respondido === true) {
            if(confirmarState.confirmar) confirmarAccion(confirmarState.data.id);
            else dispatch(setResetQuestion());
        }
    }, [confirmarState.respondido])

    const editarProveedor = proveedor => {
        navigate(`/proveedores/${ proveedor.id }`)
    }

    const eliminarProveedor = (proveedor) => {
        dispatch(setQuestion({
            mostrar: true,
            titulo: "Eliminar proveedor",
            mensaje: `¿Estás seguro de que quieres eliminar a ${proveedor.nombreP} de tus proveedores?`,
            data: proveedor
        }))
    }

    const confirmarAccion = id => {
        dispatch(setResetQuestion());
        api.del(`${URL_PROVEEDORES}/${ id }`)
            .then(res => res.status === 200 && listarProveedores())
            .catch(err => console.log("error:", err));
    }

    const formatoRegistro = registro => [
        registro.nombreP,
        registro.ruc,
        registro.direccion,
        registro.telefono,
        registro.correo || "Sin correo"
    ]

    return (
        <div className="contenedor">
            <h1>Proveedores</h1>
            <Buscador
                datos={ proveedores }
                setFiltro={ setFiltro }
                campos={ ["ruc", "nombreP"] }
            />
            <Link to="/proveedores/registrar" >Registrar proveedor</Link>
            <Tabla
                titulos={
                    ["Nombre", "RUC", "Dirección", "Teléfono", "Correo", "Opciones"]
                }
                registros={ filtro }
                editarRegistro={ editarProveedor }
                eliminarRegistro={ eliminarProveedor }
                formatoRegistro={ formatoRegistro }
            />
        </div>
    )
}
