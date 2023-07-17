import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "../../styles/carta.module.scss";

export const Carta = ({ carta, eliminarCarta, detalleCarta}) => {
    const { nombreCarta, imagenCarta, descripcionCarta, precioCarta, idCarta } = carta;
    const usuario = useSelector(state => state.usuario);
    return (
        <div 
            className={ styles["contenedor-carta"] } 
            onClick={ () => detalleCarta(carta) }
        >
            {
                usuario.idRol >= 2 && (
                    <div className={ styles["opciones"] }>
                        <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><circle cx="256" cy="256" r="48"/><circle cx="256" cy="416" r="48"/><circle cx="256" cy="96" r="48"/></svg>
                        <div className={ styles["contenedor"]}>
                            <Link 
                                to={`/carta/${ idCarta }/ingredientes`}
                                className={ styles["opcion"] }
                            >
                                Ingredientes
                            </Link>
                            <Link 
                                to={`/carta/${ idCarta }`}
                                className={ styles["opcion"] }
                            >
                                Editar
                            </Link>
                            <button 
                                onClick={ e => {
                                    e.stopPropagation();
                                    eliminarCarta(carta)
                                } } 
                                className={ styles["opcion"] }
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                )
            }
            <figure className={ styles["contenedor-img"] }>
                <img src={ imagenCarta } alt={ nombreCarta } />
            </figure>
            <div className={ styles["contenido-detalle"]}>
                <h4 className={ styles["titulo"]}>{ nombreCarta }</h4>
                <p className={ styles["descripcion"] }>{ descripcionCarta }</p>
                <button className={ styles["precio"] }>
                    S/{ precioCarta }
                </button>
            </div>
        </div>
    )
}
