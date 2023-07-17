import { configureStore } from "@reduxjs/toolkit";
import confirmReducer from "../reducers/confirmReducer";
import notificacionesReducer from "../reducers/notificacionesReducer";
import userReducer from "../reducers/userReducer";

export default configureStore({
    reducer: {
        usuario: userReducer,
        confirmar: confirmReducer,
        notificaciones: notificacionesReducer
    }
})