import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setQuestion, setResetQuestion } from '../../store/reducers/confirmReducer';
import { Boton } from './Boton'

export const BtnConfirmacion = ({ texto, confirmarAccion, datosConfirmacion}) => {
    const confirmarState = useSelector (state => state.confirmar)
    const dispatch = useDispatch();

    const mostrarConfirmacion = () => {
        dispatch(setQuestion(datosConfirmacion))
    }

    useEffect(()=> {
        if(confirmarState.respondido === true) {
            if(confirmarState.confirmar) confirmarAccion(confirmarState.data.id);
            dispatch(setResetQuestion());
        }
    }, [confirmarState.respondido])

    return (
        <Boton
            texto={ texto }
            onClick={ mostrarConfirmacion }
        />
    )
}
