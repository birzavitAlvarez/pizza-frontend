export const RegistroAlmacen = (props) => {
    const { 
        formatoRegistro,
        ...registro
     } = props;
    const formato = formatoRegistro(registro)
    return (
        <tr>
            {
                formato
                    .map(dato => <td key={ Math.random() }>{ dato }</td>)
            }
        </tr>
    )
}
