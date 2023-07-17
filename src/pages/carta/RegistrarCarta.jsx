import { useState } from "react"
import { URL_INGREDIENTES } from "../../api/api"
import { FormCarta } from "../../components/pure/form/FormCarta"
import { helpHttp } from "../../utils/helpHttp"

export const RegistrarCarta = () => {
    const [ingredientes, setIngredientes] = useState([])
    const api = helpHttp();
    const registrarIngredientes = () => {
        api.post(URL_INGREDIENTES, { body: ingredientes })
            .then(res => {

            })
            .catch(err => {

            })
            .finally(() => {

            })
    }
    const agregarIngrediente = ingrediente => 
        setIngredientes([...ingredientes, ingrediente])
    const eliminarIngrediente = id => {
        const nuevosIngredientes =ingredientes
            .filter(ingrediente => ingrediente.idIngrediente != id)
        setIngredientes(nuevosIngredientes);
    }
    return (
        <div>
            <h1>Registrar Carta</h1>
            <FormCarta registrarIngredientes={ registrarIngredientes } />
        </div>
    )
}
