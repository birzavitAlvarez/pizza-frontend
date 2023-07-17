import { useEffect, useRef } from "react";
import "../../../styles/general.scss";

/**
 * Componente de buscador que filtra resultados
 * 
 * @param {Object} props - Las propiedades del componente.
 * @param {string[]} props.datos - El objeto con los datos a filtrar.
 * @param {function} props.setFiltro - La función para establecer el filtro de búsqueda.
 * @param {string[]} props.campos - Los campos en los que buscar.
 * 
 * @returns {JSX.Element} - El componente de buscador.
 */

export const Buscador= ({ datos, setFiltro, campos }) => {
    const consulta = useRef()
    const controlarFiltro = () => {
        const busqueda = consulta.current.value.toLowerCase() || "";
        const datosFiltrados = datos.filter(dato => 
            campos.some(campo => dato[campo].toString().toLowerCase().includes(busqueda)) && dato
        )
        setFiltro(datosFiltrados);
    }
    useEffect(()=>{ controlarFiltro() }, [datos])
    return (
        <form>
            <input 
                type="text" 
                ref={ consulta } 
                className="buscador"
                onChange={ controlarFiltro }
                placeholder="Buscar..." 
            />
        </form>
    )
}
