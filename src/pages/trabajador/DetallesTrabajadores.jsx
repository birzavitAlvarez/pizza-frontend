import { useEffect, useState } from "react";
import { useParams } from "react-router"
import { URL_TRABAJADORES } from "../../api/api";
import { BtnRegresar } from "../../components/pure/BtnRegresar";
import { helpHttp } from "../../utils/helpHttp";
import styles from "../../styles/detallesTrabajadores.module.scss"

export const DetallesTrabajadores = () => {
    const { idTrabajador }= useParams();
    const api = helpHttp();
    const [trabajador, setTrabajador] = useState({});
    useEffect(()=>{
        api.get(`${URL_TRABAJADORES}/${idTrabajador}`)
            .then(res => {
                res.status === 200
                    ? setTrabajador(res.data)
                    : window.history.back();
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    return (
        <div className={ styles["contenedor"] }>
            <h1>Detalles del trabajador</h1>
            <p><b>Nombres:</b> { trabajador.nombre }</p>
            <p><b>Apellidos:</b> { trabajador.apellido }</p>
            <p><b>Edads:</b> { trabajador.edad }</p>
            <p><b>DNI:</b> { trabajador.dni }</p>
            <p><b>Teléfono:</b> { trabajador.telefono }</p>
            <p><b>Correo:</b> { trabajador.correo }</p>
            <p><b>Fecha Alta:</b> { trabajador.fechaAlta }</p>
            <p><b>Fecha Baja:</b>{ trabajador.fechaBaja }</p>
            <p><b>Dirección:</b> { trabajador.direccion }</p>
            <p><b>Usuario:</b> { trabajador.nombreUsuario }</p>
            <BtnRegresar/>
        </div>
    )
}
