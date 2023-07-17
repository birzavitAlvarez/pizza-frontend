import { useState } from "react";
import { TablaUsuario } from "../../components/container/TablaUsuario";
import { Buscador } from "../../components/pure/form/Buscador";
import styles from "../../styles/listar-usuarios.module.scss"

export const ListarUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [filtro, setFiltro] = useState([])

    return (
        <div className={ styles["contenedor"]}>
            <h1>Usuarios</h1>
            <Buscador
                datos={ usuarios }
                setFiltro={ setFiltro }
                campos={ ["usuario"] }
            />
            <TablaUsuario
                filtro={ filtro }
                setUsuarios={ setUsuarios }
            />
        </div>
    )
}
