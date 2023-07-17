import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { URL_BOLETA, URL_VENTAS } from "../../api/api";
import { TablaVentas } from "../../components/container/TablaVentas";
import { setQuestion, setResetQuestion } from "../../store/reducers/confirmReducer";
import styles from "../../styles/pages/listar-ventas.module.scss";
import { helpHttp } from "../../utils/helpHttp";

export const ListarVentas = () => {
    const [ventas, setVentas] = useState([])
    const confirmarState = useSelector (state => state.confirmar)
    const api = helpHttp()
    const dispatch = useDispatch();
    const listarVentas = () => {
        api.get(URL_VENTAS)
            .then(res => {
                if (!res.err) {
                    setVentas(res.data)
                }
            })
    }
    useEffect(() => {
        listarVentas();
    }, [])
    useEffect(()=> {
        if(confirmarState.respondido === true) {
            if(confirmarState.confirmar) confirmarAccion(confirmarState.data.id);
            else dispatch(setResetQuestion());
        }
    }, [confirmarState.respondido])
    const formatoRegistro = registro => [
        registro.id,
        registro.fechaVenta,
        registro.subTotalVenta,
        registro.igvVenta,
        registro.totalVenta
    ];
    const eliminarRegistro = registro => {
        dispatch(setQuestion({
            mostrar: true,
            titulo: "Eliminar venta",
            mensaje: `¿Estás seguro de que quieres eliminar la venta ${registro.id}?`,
            data: registro
        }))
    }
    const confirmarAccion = id => {
        dispatch(setResetQuestion());
        api.del(`${URL_VENTAS}/${ id }`)
            .then(res => res.status === 200 && listarVentas())
            .catch(err => console.log("error:", err));
    }
    const generarBoleta = registro => {
        fetch(`${URL_BOLETA}/${registro.id}`, {
            method: "GET",
            mode: "cors"
        })
            .then(res => res.ok ? res.blob() : Promise.reject(res))
            .then(blob => {
                const url = URL.createObjectURL(blob);
                window.open(url, "_blank")
            })
            .catch(err => {
                console.log(err)
                alert("Error al generar la boleta.")
            })
    }
    return (
        <div className={ styles["contenedor"]}>
            <h1>Ventas</h1>
            <Link to="/ventas/registrar">Registrar venta</Link>
            <TablaVentas
                titulos={["N° Boleta", "Fecha", "Subtotal", "IGV", "Total", "Opciones"]}
                registros={ ventas }
                formatoRegistro={ formatoRegistro }
                eliminarRegistro={ eliminarRegistro }
                generarBoleta={ generarBoleta }
            />
        </div>
    )
}
