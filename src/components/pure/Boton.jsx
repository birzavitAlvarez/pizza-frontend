export const Boton = ({ texto, ...props}) => {
    return (
        <button 
            type="button"
            className="boton" { ...props }
        >
            { texto }
        </button>
    )
}
