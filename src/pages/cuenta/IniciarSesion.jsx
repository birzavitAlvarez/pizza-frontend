import { Link } from "react-router-dom";
import { FormIniciarSesion } from "../../components/pure/form/FormIniciarSesion";
import "../../styles/iniciar-sesion.scss";

export const IniciarSesion = () => {
    return (
        <div className="iniciar-sesion-contenedor">
            <h2>¡HEY!</h2>
            <img src="/public/logo-amanti.jpg" alt="logo amanti pizzas" />
            <p>No te conformes con una,<br />pide más</p>
            <FormIniciarSesion/>
            <div>
                <p>
                    ¿No tienes cuenta?
                    <Link to="/registrarse"> <b>Registrate</b></Link>
                </p>
            </div>
        </div>
    )
}
