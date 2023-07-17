import React, { useState, useEffect } from 'react'
import { URL_ALMACEN, URL_PRODUCTOS } from '../../api/api';
import { TablaAlmacen } from '../../components/container/TablaAlmacen';
import { Alerta } from '../../components/pure/Alerta';
import { Buscador } from '../../components/pure/form/Buscador';
import { helpHttp } from '../../utils/helpHttp'
import styles from "../../styles/pages/listar-almacen.module.scss";

export const ListarAlmacen = () => {
    const [registros, setRegistros] = useState([])
    const [alerta, setAlerta] = useState({});
    const [filtro, setFiltro] = useState([]);
    const api = helpHttp();
    useEffect(() => {
        api.get(URL_PRODUCTOS)
            .then(res => {
                res.status === 200 && setRegistros(res.data)
            })
            .catch(err => {
                setAlerta({
                    texto: "Ocurrió un error al tratar de obtener los datos del almacén",
                    color: "rojo"
                })
            })
    }, [])
    const formatoRegistro = producto => [
        producto.nombre,
        producto.cantidadProducto + producto.unidadMedida
    ]
    return (
        <div className={ styles["contenedor"] }>
            <h1>Almacen</h1>
            <Buscador
                datos={ registros }
                setFiltro={ setFiltro }
                campos={ ["nombre"] }
            />
            <TablaAlmacen
                titulos={["Producto", "Cantidad"]}
                registros={ filtro }
                formatoRegistro={ formatoRegistro }
            />
            <Alerta datos={ alerta }/>
        </div>
    )
}
