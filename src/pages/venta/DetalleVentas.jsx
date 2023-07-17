import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { URL_VENTAS } from "../../api/api";
import { TablaAlmacen } from "../../components/container/TablaAlmacen";
import { BtnRegresar } from "../../components/pure/BtnRegresar";
import { helpHttp } from "../../utils/helpHttp"
import styles from "../../styles/pages/detalles-venta.module.scss";

const initialState = {
    fechaVenta: "Sin fecha",
    subTotalVenta: 0,
    igvVenta: 0,
    totalVenta: 0,
    detalles: []
}
export const DetalleVentas = () => {
    const [venta, setVenta] = useState(initialState);
    const api = helpHttp();
    const { idVenta } = useParams();
    useEffect(() => {
        api.get(`${ URL_VENTAS }/${ idVenta }`)
            .then(res => {
                if (!res.err) {
                    setVenta(res.data);
                }
            })
            .catch(err => {

            })
    }, [])
    const formatoRegistro = registro =>  [
        registro.nombreCarta,
        registro.precio,
        registro.cantidad,
        registro.total
    ];
    return (
        <div className={ styles["contenedor"] }>
            <h1>Detalles</h1>
            <p className={ styles["fecha"]}>Fecha: { venta.fechaVenta }</p>
            <div className={ styles["totales"]}>
                <p>Subtotal: { venta.subTotalVenta }</p>
                <p>IGV (18%): { venta.igvVenta }</p>
                <p>Total: { venta.totalVenta }</p>
            </div>
            <TablaAlmacen
                titulos={["Carta", "Precio", "Cantidad", "Total"]}
                registros={ venta.detalles }
                formatoRegistro={ formatoRegistro }
            />
            <div>
                <BtnRegresar/>
            </div>
        </div>
    )
}
