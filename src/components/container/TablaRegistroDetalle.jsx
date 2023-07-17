import "../../styles/tablas.scss"
import { RegistroEliminar } from "../pure/RegistroEliminar";

export const TablaRegistroDetalle = (props) => {
    const { 
        titulos,
        registros,
        eliminarRegistro,
        formatoRegistro
    } = props;
    return (
        <div className="contenedor">
             <table>
                <thead>
                    <tr>
                        {
                            titulos.map(titulo => <td key={ Math.random() }>{ titulo }</td>)
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        registros.length > 0
                            ? registros
                                .map((registro, indice) => (
                                    <RegistroEliminar
                                        key={ Math.random() }
                                        eliminarRegistro={ eliminarRegistro }
                                        formatoRegistro={ formatoRegistro }
                                        indice={indice}
                                        { ...registro }
                                    />
                                ) )
                            :
                            (
                                <tr>
                                    <td colSpan={ titulos.length + 1 }>
                                        No se encontraron registros
                                    </td>
                                </tr>
                            )
                    }
                </tbody>
            </table>
        </div>
    )
}
