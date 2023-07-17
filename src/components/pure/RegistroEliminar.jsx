export const RegistroEliminar = (props) => {
    const { 
        eliminarRegistro,
        formatoRegistro,
        indice,
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
                    <button onClick={ ()=> eliminarRegistro(indice) } >
                        Eliminar
                    </button>
                </div>
            </td>
        </tr>
    )
}
