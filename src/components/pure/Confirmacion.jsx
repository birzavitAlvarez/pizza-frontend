import { Boton } from './Boton'
import "../../styles/general.scss"
import { useDispatch, useSelector } from 'react-redux';
import { confirmQuestion, discardQuestion } from '../../store/reducers/confirmReducer';

export const Confirmacion = () => {
    const datosConfrmar = useSelector(state => state.confirmar)
    const dispatch = useDispatch();
    const {
        titulo,
        mostrar,
        mensaje
    } = datosConfrmar;
    const descartar = () => dispatch(discardQuestion())
    const confirmar = () => dispatch(confirmQuestion())
    return mostrar 
        ? (
            <div className="confirmar-contenedor">
                <div className="alerta-confirmacion">
                    <h4 className="titulo">{ titulo || "Confirmación" }</h4>
                    <p className="mensaje">{ mensaje || "¿Estás seguro de realizar esta acción?"}</p>
                    <div className="opciones">
                        <Boton texto="Descartar" onClick={ descartar } />
                        <Boton texto="Confirmar" onClick={ confirmar } />
                    </div>
                </div>
            </div>
        ) : null;
}
