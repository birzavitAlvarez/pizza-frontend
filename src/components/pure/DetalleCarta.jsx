import styles from "../../styles/detalle-carta.module.scss";
import { Boton } from "./Boton";

export const DetalleCarta = ({ carta, cerrarDetalle }) => {
    const { 
        nombreCarta, 
        imagenCarta, 
        descripcionCarta, 
        precioCarta,
        ingredientes
    } = carta;
    return (
        <section className={ styles["detalle-carta-contenedor"] }>
            <div className={ styles["contenedor-modal"] }>
                <figure className={ styles["contenedor-img"]}>
                    <img src={ imagenCarta } alt={ nombreCarta } />
                </figure>
                <div className={ styles["contenedor-detalles"]}>
                    <img 
                        src="https://cdn-icons-png.flaticon.com/512/5897/5897762.png" 
                        alt="pizza animada png" 
                        className={ styles["img-fondo"]}
                    />
                    <div className={ styles["detalles"]}>
                        <div className={ styles["titulo-contenedor"]}>
                            <h2 className={ styles["titulo"]}>{ nombreCarta }</h2>
                            <span className={ styles["subrayado"]}></span>
                        </div>
                        <p className={ styles["descripcion"]}>{ descripcionCarta }</p>
                        <div className={ styles["ingredientes-contenedor"]}>
                            <h3 className={ styles["titulo"]}>Ingredientes</h3>
                            <ul className={ styles["ingredientes"]}>
                                { ingredientes.map(ingrediente => (
                                    <li key={ ingrediente.nombreProducto }>
                                        { ingrediente.nombreProducto }
                                    </li>
                                )) }
                            </ul>
                        </div>
                    </div>
                    <div className={ styles["opciones"]}>
                        <Boton
                            onClick={ cerrarDetalle }
                            texto="Cerrar"
                        />
                        <button className={ styles["opcion"]}>
                            S/ { precioCarta }
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
