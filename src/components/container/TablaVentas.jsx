import "../../styles/tablas.scss"
import { RegistroVentas } from "../pure/RegistroVentas";

export const TablaVentas = (props) => {
    const { 
        titulos,
        registros,
        formatoRegistro,
        eliminarRegistro,
        generarBoleta
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
                                .map(registro => (
                                    <RegistroVentas
                                        key={ Math.random() }
                                        formatoRegistro={ formatoRegistro }
                                        eliminarRegistro={ eliminarRegistro }
                                        generarBoleta={ generarBoleta }
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
