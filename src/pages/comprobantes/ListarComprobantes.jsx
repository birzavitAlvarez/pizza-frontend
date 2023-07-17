import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { URL_COMPROBANTES } from "../../api/api";
import { Tabla } from "../../components/container/Tabla"
import { Buscador } from "../../components/pure/form/Buscador";
import { setQuestion, setResetQuestion } from "../../store/reducers/confirmReducer";
import { helpHttp } from "../../utils/helpHttp";
import styles from "../../styles/pages/listar-comprobantes.module.scss";

export const ListarComprobantes = () => {
    const [comprobantes, setComprobantes] = useState([]);
    const [filtro, setFiltro] = useState([]);
    const api = helpHttp();
    const confirmarState = useSelector (state => state.confirmar)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const listarComprobantes = () => {
        api.get(URL_COMPROBANTES)
            .then(res => res.status === 200 && setComprobantes(res.data))
            .catch(err => null);
    }
    useEffect(() => {
      listarComprobantes();
    }, [])

    useEffect(()=> {
        if(confirmarState.respondido === true) {
            if(confirmarState.confirmar) confirmarAccion(confirmarState.data.id);
            else dispatch(setResetQuestion());
        }
    }, [confirmarState.respondido])

    const editarComprobante = comprobante => {
        navigate(`/comprobantes/${ comprobante.id }`)
    }

    const eliminarComprobante = comprobante => {
        dispatch(setQuestion({
            mostrar: true,
            titulo: "Eliminar comprobante",
            mensaje: `¿Estás seguro de que quieres eliminar al comprobante ${comprobante.id}?`,
            data: comprobante
        }))
    }

    const confirmarAccion = id => {
        dispatch(setResetQuestion());
        api.del(`${URL_COMPROBANTES}/${ id }`)
            .then(res => res.status === 200 && listarComprobantes())
            .catch(err => console.log("error:", err));
    }

    const formatoRegistro = registro => [
        registro.id,
        registro.producto,
        registro.fechaCompro,
        registro.totalCompro
    ]
    return (
        <div className={ styles["contenedor"] }>
            <h1>Comprobantes</h1>
            <Buscador
                datos={ comprobantes }
                setFiltro={ setFiltro }
                campos={ ["id"] }
            />
            <Link to="/comprobantes/registrar">Registrar comprobante</Link>
            <Tabla
                titulos={
                    ["N° de boleta", "Producto", "Fecha", "Total", "Opciones"]
                }
                registros={ filtro }
                editarRegistro={ editarComprobante }
                eliminarRegistro={ eliminarComprobante }
                formatoRegistro={ formatoRegistro }
            />
        </div>
    )
}
