import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: null,
    usuario: null,
    contrasena: null,
    idRol: null,
    nombreRol: null,
    idTrabajador: null,
    logged: false
};

export const userReducer = createSlice({
    name: "usuario",
    initialState,
    reducers: {
        setUser: (state, action) => ({ ...action.payload.data, logged: true}),
        unsetUser: () => ({ ...initialState}),
    }
})

export const { setUser, unsetUser } = userReducer.actions;
export default userReducer.reducer;