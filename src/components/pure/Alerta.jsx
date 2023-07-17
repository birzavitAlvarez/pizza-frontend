import { useEffect, useState } from 'react'
import styles from "../../styles/alerta.module.scss";

export const Alerta = ({ datos }) => {
    const { texto, color } = datos;
    const [visible, setVisible] = useState(false);
    const [animarEntrada, setAnimarEntrada] = useState(null);
    const [animarSalida, setAnimarSalida] = useState(false);
    useEffect(()=>{
        setTimeout(() => {
            setVisible(false);
            clearTimeout(animarEntrada);
        }, 50);
    }, [])
    useEffect(() => {
        setVisible(true);
        setAnimarSalida(false);
        clearTimeout(animarEntrada);
        setAnimarEntrada(setTimeout(() => {
            ocultarVision()
        }, 4700));
    }, [datos]);
    const ocultarVision = () => {
        setAnimarSalida(true);
        clearTimeout(animarEntrada);
        setTimeout(() => {
            setVisible(false);
        }, 300);
    };
    return visible && (
        <div 
            className={`
                ${styles["alerta"]} 
                ${styles[color]} 
                ${animarSalida && styles["alerta-oculta"]}
            `}
            onClick={ ocultarVision }
        >
            { texto }
        </div>
    )
}
