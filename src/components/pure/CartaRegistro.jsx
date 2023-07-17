import { Link } from "react-router-dom";
import styles from "../../styles/carta-registro.module.scss";

export const CartaRegistro = () => {
    return (
        <Link to="/carta/registrar" className={ styles["btn-añadir"] }>
            <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M256 112v288M400 256H112"/></svg>
        </Link>
    )
}
