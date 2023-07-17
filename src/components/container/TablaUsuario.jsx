import { useEffect } from "react";
import { useSelector } from "react-redux";
import { URL_USUARIO } from "../../api/api";
import { helpHttp } from "../../utils/helpHttp";
import { BtnConfirmacion } from "../pure/BtnConfirmacion";

export const TablaUsuario = ({ filtro, setUsuarios}) => {
    const usuarioActivo = useSelector(state => state.usuario);
    const api = helpHttp();

    const datosConfirmacion = usuario => ({
        mostrar: true,
        titulo: "Eliminar usuario",
        mensaje: `¿Estás seguro de que quieres eliminar a "${usuario.usuario}" de tus usuarios?`,
        data: usuario
    })

    const confirmarAccion = id => {
        api.del(`${URL_USUARIO}/${id}`)
            .then(res => {
                listarUsuarios()
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(()=>{
        listarUsuarios()
    }, [])

    const listarUsuarios= () => {
        api.get(URL_USUARIO)
            .then(res => setUsuarios(res.data))
            .catch(err => {
                
            })
    }

    const cambiarRol = (e, usuario) => {
        const id =  parseInt(e.target.value);
        api.put(`${URL_USUARIO}/rol/${usuario.id}`, { body: { id } })
            .then(res => {
                listarUsuarios();
            })
            .catch(err => {
                
            })
    }
    return (
        <table>
            <thead>
                <tr>
                    <td>Usuario</td>
                    <td>Rol</td>
                    <td>Cambiar rol</td>
                    <td>Eliminar</td>
                </tr>
            </thead>
            <tbody>
                {
                    filtro.length > 0 && !(filtro.length === 1 && filtro[0].id === usuarioActivo.id)
                        ? (
                            filtro.map(usuario =>{
                                if (usuario.id === usuarioActivo.id) return
                                return (
                                    <tr key={ Math.random() }>
                                        <td>{ usuario.usuario }</td>
                                        <td>{ usuario.nombreRol }</td>
                                        <td>
                                            <select
                                                defaultValue={ usuario.idRol }
                                                style={{
                                                    width:  "100%",
                                                    border: "none",
                                                    paddingLeft: "var(--step-1)"
                                                }}
                                                onChange={ e => cambiarRol(e, usuario) }
                                            >
                                                <option value="1">Usuario</option>
                                                <option value="2">Trabajador</option>
                                                <option value="3">Admin</option>
                                            </select>
                                        </td>
                                        <td>
                                            <BtnConfirmacion
                                                texto="Eliminar"
                                                confirmarAccion={ confirmarAccion }
                                                datosConfirmacion={ datosConfirmacion(usuario) }
                                            />
                                        </td>
                                    </tr>
                                )
                            })
                        )
                        : (
                            <tr><td colSpan={4}>No hay usuarios</td></tr>
                        )
                }
            </tbody>
        </table>
    )
}
