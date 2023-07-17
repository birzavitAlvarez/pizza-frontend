import { Link } from "react-router-dom";
import { Boton } from "./Boton";

export const RegistroVentas = (props) => {
    const { 
        formatoRegistro,
        eliminarRegistro,
        generarBoleta,
        ...registro
     } = props;
    const formato = formatoRegistro(registro)
    return (
        <tr>
            {
                formato
                    .map(dato => <td key={ Math.random() }>{ dato }</td>)
            }
            <td>
                <div className="opciones">
                    <Boton texto="Generar boleta" onClick={ () => generarBoleta(registro) } />
                    <Boton
                        texto="Eliminar"
                        onClick={ () => eliminarRegistro(registro) }
                    />
                </div>
            </td>
        </tr>
    )
}
