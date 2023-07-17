import "../../styles/general.scss"

export const BtnRegresar = () => {
    const regresar = () => window.history.back();
    return (
        <button 
            onClick={ regresar } 
            className="btn-regresar"
            type="button"
        >
            Regresar
        </button>
    )
}
