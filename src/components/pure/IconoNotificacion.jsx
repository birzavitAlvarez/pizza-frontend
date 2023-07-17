import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { obtenerProductosFaltantes } from "../../store/reducers/notificacionesReducer";

export const IconoNotificacion = () => {
    const dispatch = useDispatch();
    
    const notificaciones = useSelector(state => 
        state
        .notificaciones
        .productosFaltantes
        .length
    );
    
    const n = (notificaciones + "").length
    
    useEffect(() => { 
        dispatch(obtenerProductosFaltantes())
    }, [])

    return (
        <Link className="notificaciones" to="/notificaciones">
            <p 
                className="cantidad-notificacion" 
                style={{ transform: `translate(calc(-20% + ${n * 10 * -1}%), -20%)` }}
            >
                { notificaciones }
            </p>
            <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512"><path d="M256 480a80.09 80.09 0 0073.3-48H182.7a80.09 80.09 0 0073.3 48zM400 288v-60.53C400 157 372.64 95.61 304 80l-8-48h-80l-8 48c-68.88 15.61-96 76.76-96 147.47V288l-48 64v48h384v-48z"/></svg>
        </Link>
    )
}
