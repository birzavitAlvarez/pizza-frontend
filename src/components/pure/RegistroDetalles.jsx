export const RegistroDetalles= (props) => {
    const { 
        eliminarRegistro,
        editarRegistro,
        formatoRegistro,
        detalleRegistro,
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
                    <button onClick={ ()=> detalleRegistro(registro) } >
                        Detalles
                    </button>
                    <button onClick={ ()=> editarRegistro(registro) } >
                        Editar
                    </button>
                    <button onClick={ ()=> eliminarRegistro(registro) } >
                        Eliminar
                    </button>
                </div>
            </td>
        </tr>
    )
}
