import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { helpHttp } from "../../utils/helpHttp"
import { useNavigate } from "react-router";
import "../../styles/listarProveedor.scss"
import { URL_TRABAJADORES } from "../../api/api";
import { Buscador } from "../../components/pure/form/Buscador";
import { useDispatch, useSelector } from "react-redux";
import { setQuestion, setResetQuestion } from "../../store/reducers/confirmReducer";
import { TablaDetalles } from "../../components/container/TablaDetalles";

export const ListarTrabajadores = () => {
    const [trabajadores, setTrabajadores] = useState([]);
    const [filtro, setFiltro] = useState([]);
    const dispatch = useDispatch();
    const confirmarState = useSelector (state => state.confirmar)
    const navigate = useNavigate();
    const api = helpHttp();

    const listarTrabajadores = () => {
        api.get(URL_TRABAJADORES)
            .then(res => res.status === 200 && setTrabajadores(res.data))
            .catch(err => null);
    }

    useEffect(() => { 
        listarTrabajadores() 
    }, [])

    useEffect(()=> {
        if(confirmarState.respondido === true) {
            if(confirmarState.confirmar) confirmarAccion(confirmarState.data.id);
            else dispatch(setResetQuestion());
        }
    }, [confirmarState.respondido])

    const detalleTrabajador= trabajador =>{
        navigate(`/trabajadores/${ trabajador.id }/detalles`)
    }

    const editarTrabajador = trabajador => {
        navigate(`/trabajadores/${ trabajador.id }`)
    }

    const eliminarTrabajador = (trabajador) => {
        dispatch(setQuestion({
            mostrar: true,
            titulo: "Eliminar trabajador",
            mensaje: `¿Estás seguro de que quieres eliminar a ${trabajador.nombre} de tus trabajadores?`,
            data: trabajador
        }))
    }

    const confirmarAccion = id => {
        dispatch(setResetQuestion());
        api.del(`${URL_TRABAJADORES}/${ id }`)
            .then(res => res.status === 200 && listarTrabajadores())
            .catch(err => console.log("error:", err));
    }

    const formatoRegistro = registro => [
        registro.nombre,
        registro.apellido,
        registro.direccion,
        registro.correo || "Sin correo"
    ]

    return (
        <div className="contenedor">
            <h1>Trabajadores</h1>
            <Buscador
                datos={ trabajadores }
                setFiltro={ setFiltro }
                campos={ ["nombre"] }
            />
            <Link to="/trabajadores/registrar" >Registrar trabajador</Link>
            <TablaDetalles
                titulos={
                    ["Nombre", "Apellido", "Dirección", "Correo", "Opciones"]
                }
                registros={ filtro }
                editarRegistro={ editarTrabajador }
                eliminarRegistro={ eliminarTrabajador }
                formatoRegistro={ formatoRegistro }
                detalleRegistro={ detalleTrabajador }
            />
        </div>
    )
}
