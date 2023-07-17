import { useDispatch, useSelector } from "react-redux"
import { Boton } from "../../components/pure/Boton";
import { unsetUser } from "../../store/reducers/userReducer";
import { FormRegistrarUsuario } from "../../components/pure/form/FormRegistrarUsuario";
import "../../styles/perfil-usuario.scss"
import { useNavigate } from "react-router";

export const Perfil = () => {
    const usuario = useSelector(state => state.usuario);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cerrarSesion = () => {
        sessionStorage.removeItem("usuario");
        sessionStorage.removeItem("rutaActual");
        dispatch(unsetUser());
        navigate("/iniciar-sesion");
    }
    return (
        <div className="perfil-usuario-contenedor">
            <h1>Perfil de Usuario</h1>
            {
                usuario.idRol > 1 && <h3>Rol: { usuario.nombreRol }</h3>
            }
            <FormRegistrarUsuario/>
            <Boton
                texto="Cerrar sesión"
                onClick={ cerrarSesion }
            />
        </div>
    )
}
