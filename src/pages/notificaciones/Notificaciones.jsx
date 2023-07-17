import { useEffect, useState } from "react"
import { URL_PRODUCTOS } from "../../api/api"
import { helpHttp } from "../../utils/helpHttp"
import "../../styles/listarProductos.scss";
import { useSelector } from "react-redux";
import { TablaAlmacen } from "../../components/container/TablaAlmacen";

export const Notificaciones = () => {
    const notificaciones = useSelector(state => state.notificaciones)

    const formatoRegistro = registro => [
        registro.nombre,
        registro.claseProducto,
        registro.cantidadProducto + registro.unidadMedida
    ]

    return (
        <div className="contenedor">
            <h1>Notificaciones</h1>
            <p>Estos productos están apunto de acabarse.</p>
            <TablaAlmacen
                titulos={
                    ["Producto", "Clase", "Cantidad"]
                }
                registros={ notificaciones.productosFaltantes }
                formatoRegistro={ formatoRegistro }
            />
        </div>
    )
}
