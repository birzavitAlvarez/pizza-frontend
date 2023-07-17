import "../../styles/tablas.scss"
import { RegistroAlmacen } from "../pure/RegistroAlmacen";

export const TablaAlmacen= (props) => {
    const { 
        titulos,
        registros,
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
                                    <RegistroAlmacen
                                        key={ Math.random() }
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
