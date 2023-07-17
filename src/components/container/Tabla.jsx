import "../../styles/tablas.scss"
import { Registro } from "../pure/Registro";

export const Tabla= (props) => {
    const { 
        titulos,
        registros,
        editarRegistro,
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
                                .map(registro => (
                                    <Registro
                                        key={ Math.random() }
                                        editarRegistro={ editarRegistro }
                                        eliminarRegistro={ eliminarRegistro }
                                        formatoRegistro={ formatoRegistro }
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
