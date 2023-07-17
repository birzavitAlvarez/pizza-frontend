import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mostrar: false,
    titulo: "",
    mensaje: "",
    data: null,
    confirmar: null,
    respondido: null
}

export const confirmReducer = createSlice({
    name: "confirmar",
    initialState,
    reducers: {
        setQuestion: (state, action) => ({
            ...initialState, ...action.payload, mostrar: true
        }),
        confirmQuestion: (state) => ({
            ...state, 
            respondido: true, 
            confirmar: true
        }),
        discardQuestion: (state) => ({
            ...state,
            respondido: true,
            confirmar: false
        }),
        setResetQuestion: ()=> initialState
    }
})

export const { setQuestion, setResetQuestion, confirmQuestion, discardQuestion } = confirmReducer.actions;
export default confirmReducer.reducer;