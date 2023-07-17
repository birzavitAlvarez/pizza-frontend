import "../../styles/tablas.scss"
import { RegistroDetalles } from "../pure/RegistroDetalles";
import { RegistroProducto } from "../pure/RegistroProducto";

export const TablaProductos = (props) => {
    const { 
        titulos,
        registros,
        editarRegistro,
        eliminarRegistro,
        formatoRegistro,
        agregarRegistro
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
                                    <RegistroProducto
                                        key={ Math.random() }
                                        editarRegistro={ editarRegistro }
                                        eliminarRegistro={ eliminarRegistro }
                                        formatoRegistro={ formatoRegistro }
                                        agregarRegistro={ agregarRegistro }
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
