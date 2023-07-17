import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { helpHttp } from "../../utils/helpHttp"
import { useNavigate, useParams } from "react-router";
import "../../styles/listarProveedor.scss"
import { URL_CARTA, URL_INGREDIENTES, URL_PROVEEDORES } from "../../api/api";
import { Tabla } from "../../components/container/Tabla";
import { Buscador } from "../../components/pure/form/Buscador";
import { useDispatch, useSelector } from "react-redux";
import { setQuestion, setResetQuestion } from "../../store/reducers/confirmReducer";
import { BtnRegresar } from "../../components/pure/BtnRegresar";

export const ListarIngredientesCarta = () => {
    const [ingredientes, setIngredientes] = useState([])
    const [filtro, setFiltro] = useState([]);
    const { idCarta } = useParams();
    const dispatch = useDispatch();
    const confirmarState = useSelector (state => state.confirmar)
    const navigate = useNavigate();
    const api = helpHttp();

    const listarIngredientes = async () => {
        api.get(`${ URL_CARTA }/${ idCarta }`)
            .then(res => res.status === 200 && setIngredientes(res.data.ingredientes))
            .catch(err => null);
    }

    useEffect(() => { 
        listarIngredientes() 
    }, [])

    useEffect(()=> {
        if(confirmarState.respondido === true) {
            if(confirmarState.confirmar) confirmarAccion(confirmarState.data.id);
            else dispatch(setResetQuestion());
        }
    }, [confirmarState.respondido])

    const editarIngrediente = ingrediente => {
        navigate(`/carta/${ idCarta }/ingredientes/${ ingrediente.id }`);
    }

    const eliminarIngrediente= ingrediente => {
        dispatch(setQuestion({
            mostrar: true,
            titulo: "Eliminar proveedor",
            mensaje: `¿Estás seguro de que quieres eliminar el ingrediente ${ingrediente.nombreProducto}?`,
            data: ingrediente
        }))
    }

    const confirmarAccion = id => {
        dispatch(setResetQuestion());
        api.del(`${URL_INGREDIENTES}/${ id }`)
            .then(res => res.status === 200 && listarIngredientes())
            .catch(err => console.log("error:", err));
    }

    const formatoRegistro = registro => [
        registro.nombreProducto,
        registro.cantidadProducto,
    ]

    return (
        <div className="contenedor">
            <h1>Ingredientes</h1>
            <Buscador
                datos={ ingredientes }
                setFiltro={ setFiltro }
                campos={ ["nombreProducto"] }
            />
            <Link to={`/carta/${ idCarta }/ingredientes/registrar`}>Registrar ingrediente</Link>
            <Tabla
                titulos={
                    ["Ingrediente", "Cantidad", "Opciones"]
                }
                registros={ filtro }
                editarRegistro={ editarIngrediente }
                eliminarRegistro={ eliminarIngrediente }
                formatoRegistro={ formatoRegistro }
            />
            <div>
                <BtnRegresar />
            </div>
        </div>
    )
}
