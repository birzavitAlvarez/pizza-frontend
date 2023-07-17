import { useEffect } from "react";
import { useState } from "react";
import { URL_DETALLE_VENTAS, URL_VENTAS } from "../../api/api";
import { TablaAlmacen } from "../../components/container/TablaAlmacen";
import { Boton } from "../../components/pure/Boton";
import { BtnRegresar } from "../../components/pure/BtnRegresar";
import { FormVentas } from "../../components/pure/form/FormVentas"
import { helpHttp } from "../../utils/helpHttp";
import styles from "../../styles/pages/registrar-venta.module.scss";
import { Alerta } from "../../components/pure/Alerta";
import { TablaRegistroDetalle } from "../../components/container/TablaRegistroDetalle";
import { useDispatch } from "react-redux";
import { obtenerProductosFaltantes } from "../../store/reducers/notificacionesReducer";


const ventaVacia = {
    subTotalVenta: 0,
    igvVenta: 0,
    totalVenta: 0
}
export const RegistrarVenta = () => {
    const [alerta, setAlerta] = useState({});
    const [pedidos, setPedidos] = useState([]);
    const dispatch = useDispatch();
    const [totales, setTotales] = useState({ subTotalVenta: 0, igvVenta: 0, totalVenta: 0 });
    const [cartas, setCartas] = useState([]);
    const api = helpHttp();
    useEffect(() => {
        const subTotalVenta = pedidos.reduce((total, pedido) => total + pedido.total , 0);
        const igvVenta = subTotalVenta * 0.18;
        const totalVenta = subTotalVenta + igvVenta;
        setTotales({
            subTotalVenta: parseFloat(subTotalVenta.toFixed(2)),
            igvVenta: parseFloat(igvVenta.toFixed(2)),
            totalVenta: parseFloat(totalVenta.toFixed(2)),
        });
    }, [pedidos])
    const formatoRegistro = registro => {
        const pedido = cartas.find(carta => carta.idCarta === registro.carta.idCarta);
        return [
            pedido.nombreCarta,
            registro.precio,
            registro.cantidad,
            registro.total
        ]
    }
    const generarVenta = () => {
        api.post(URL_VENTAS, { body: ventaVacia })
            .then(resVenta => {
                if (!resVenta.err) {
                    const detalles = pedidos.map(pedido => ({
                        ...pedido,
                        venta: {
                            id: resVenta.data.id
                        }
                    }))
                    api.post(URL_DETALLE_VENTAS, { body: detalles })
                        .then(resDetalle => {
                            if (!resDetalle.err) {
                                api.put(`${URL_VENTAS}/${resVenta.data.id}`, { body: totales })
                                    .then(resVentaActualizada => {
                                        if (!resVentaActualizada.err) {
                                            setAlerta({
                                                texto: "La venta se registró de manera exitosa",
                                                color: "verde"
                                            }) 
                                            dispatch(obtenerProductosFaltantes())
                                        } else {
                                            setAlerta({
                                                texto: "Ocurrió un error de formato al tratar de registrar la venta",
                                                color: "rojo"
                                            }) 
                                        }
                                    })
                                    .catch(err => {
                                        setAlerta({
                                            texto: "Ocurrió un error al tratar de registrar la venta",
                                            color: "rojo"
                                        }) 
                                    })
                            } else {
                                setAlerta({
                                    texto: "Ocurrió un error de formato al tratar de registrar los detalles de la venta",
                                    color: "rojo"
                                }) 
                            }
                        })
                        .catch( err => {
                            setAlerta({
                                texto: "Ocurrió un error al tratar de registrar los detalles de la venta",
                                color: "rojo"
                            }) 
                        })
                } else {
                    setAlerta({
                        texto: "Ocurrió un error de formato al tratar de iniciar el registro de la venta",
                        color: "rojo"
                    }) 
                }
            })
            .catch(err => {
                setAlerta({
                    texto: "Ocurrió un error al tratar de iniciar el registro de la venta",
                    color: "rojo"
                }) 
            })
    };
    const eliminarRegistro = registro => {
        const copiaPedidos = [...pedidos];
        copiaPedidos.splice(registro, 1);
        setPedidos(copiaPedidos);
    }
    return (
        <div className={ styles["contenedor-ventas"] }>
            <h1>Registrar venta</h1>
            <FormVentas 
                pedidos={ pedidos }
                setPedidos={ setPedidos } 
                cartas={ cartas }
                setCartas={ setCartas }
            />
            <TablaRegistroDetalle
                titulos={["Carta", "Precio", "Cantidad", "Total", "Opciones"]}
                registros={ pedidos }
                eliminarRegistro={ eliminarRegistro }
                formatoRegistro={ formatoRegistro }
            />
            <div className={ styles["detalles"]}>
                <p>Subtotal: { totales.subTotalVenta }</p>
                <p>IGV (18%): { totales.igvVenta }</p>
                <p>Total: {totales.totalVenta }</p>
                <div className={ styles["opciones"]}>
                    <BtnRegresar/>
                    <Boton
                        onClick={ generarVenta }
                        texto="Generar venta"
                    />
                </div>
            </div>
            <Alerta datos={ alerta } />
        </div>
    )
}
