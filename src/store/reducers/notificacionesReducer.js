import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { URL_PRODUCTOS } from "../../api/api";
import { helpHttp } from "../../utils/helpHttp";

const api = helpHttp();

export const obtenerProductosFaltantes = createAsyncThunk(
  "notificaciones/obtenerProductosFaltantes",
  async () => {
    const res = await api.get(`${URL_PRODUCTOS}/faltantes`);
    if (res.status === 200) return res.data;
    throw new Error("Error al obtener productos faltantes");
  }
);

const initialState = {
  productosFaltantes: [],
  loading: false,
  error: null,
};

const notificacionesReducer = createSlice({
  name: "notificaciones",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(obtenerProductosFaltantes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(obtenerProductosFaltantes.fulfilled, (state, action) => {
        state.loading = false;
        state.productosFaltantes = action.payload;
      })
      .addCase(obtenerProductosFaltantes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default notificacionesReducer.reducer;
