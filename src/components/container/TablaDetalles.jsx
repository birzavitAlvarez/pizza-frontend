import "../../styles/tablas.scss"
import { RegistroDetalles } from "../pure/RegistroDetalles";

export const TablaDetalles= (props) => {
    const { 
        titulos,
        registros,
        editarRegistro,
        eliminarRegistro,
        formatoRegistro,
        detalleRegistro
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
                                    <RegistroDetalles
                                        key={ Math.random() }
                                        editarRegistro={ editarRegistro }
                                        eliminarRegistro={ eliminarRegistro }
                                        formatoRegistro={ formatoRegistro }
                                        detalleRegistro={ detalleRegistro }
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
