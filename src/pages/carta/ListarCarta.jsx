import React, { useState } from 'react'
import { useEffect } from 'react'
import { URL_CARTA } from '../../api/api';
import { Carta } from '../../components/pure/Carta';
import { helpHttp } from '../../utils/helpHttp'
import styles from "../../styles/pages/listar-carta.module.scss"
import { CartaRegistro } from '../../components/pure/CartaRegistro';
import { useDispatch, useSelector } from 'react-redux';
import { setQuestion, setResetQuestion } from '../../store/reducers/confirmReducer';
import { DetalleCarta } from '../../components/pure/DetalleCarta';

export const ListarCarta = () => {
    const [cartas, setCartas] = useState([])
    const [mostrarDetalle, setMostrarDetalle] = useState(false);
    const [detallesCarta, setDetallesCarta] = useState({});
    const api = helpHttp();
    const usuario = useSelector(state => state.usuario);
    const confirmarState = useSelector (state => state.confirmar)
    const dispatch = useDispatch();

    const listarCarta = () => {
        api.get(URL_CARTA)
            .then(res => {
                if (res.status === 200) {
                    setCartas(res.data)
                }
            })
            .catch(err => {
                console.log("error", err)
            })
    }
    useEffect(() => {
        listarCarta()
    }, [])
    useEffect(()=> {
        if(confirmarState.respondido === true) {
            if(confirmarState.confirmar) confirmarAccion(confirmarState.data.idCarta);
            else dispatch(setResetQuestion());
        }
    }, [confirmarState.respondido])
    const eliminarCarta = carta => {
        dispatch(setQuestion({
            mostrar: true,
            titulo: "Eliminar carta",
            mensaje: `¿Estás seguro de que quieres eliminar ${carta.nombreCarta} de tus cartas?`,
            data: carta
        }))
    }
    const confirmarAccion = id => {
        dispatch(setResetQuestion());
        api.del(`${URL_CARTA}/${ id }`)
            .then(res => res.status === 200 && listarCarta())
            .catch(err => console.log("error:", err));
    }
    const detalleCarta = carta => {
        setMostrarDetalle(true);
        setDetallesCarta(carta);
    }
    const cerrarDetalle = () => setMostrarDetalle(false);
    return (
        <div className={ styles["contenedor"]}>
            <video 
                src="/public/media/pizza-fondo.mp4" 
                autoPlay muted loop
                className={  styles["video"]}
            ></video>
            <h1>Cartas</h1>
            <div className={ styles["lista-cartas"]}>
                {
                    cartas.map(carta => (
                        <Carta 
                            key={ carta.idCarta }
                            eliminarCarta={ eliminarCarta }
                            detalleCarta={ detalleCarta }
                            carta={ carta } 
                        />
                    ))
                }
                { usuario.idRol >= 2 && <CartaRegistro /> } 
            </div>
            { mostrarDetalle && <DetalleCarta 
                    carta={ detallesCarta } 
                    cerrarDetalle={ cerrarDetalle }
                /> }
        </div>
    )
}
