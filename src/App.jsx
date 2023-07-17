import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { URL_USUARIO } from "./api/api";
import "./App.css";
import { Header } from "./components/container/Header";
import { Confirmacion } from "./components/pure/Confirmacion";
import { LayoutSimple } from "./layout/LayoutSimple";
import { NotFound } from "./pages/404/NotFound";
import { IniciarSesion } from "./pages/cuenta/IniciarSesion";
import { ListarUsuarios } from "./pages/cuenta/ListarUsuarios";
import { Perfil } from "./pages/cuenta/Perfil";
import { RegistrarUsuario } from "./pages/cuenta/RegistrarUsuario";
import { Inicio } from "./pages/Inicio";
import { ListarProductos } from "./pages/productos/ListarProductos";
import { ModificarProducto } from "./pages/productos/ModificarProducto";
import { RegistrarProductos } from "./pages/productos/RegistrarProductos";
import { ListarProveedores } from "./pages/Proveedores/ListarProveedores";
import { ModificarProveedor } from "./pages/Proveedores/ModificarProveedor";
import { RegistrarProveedor } from "./pages/Proveedores/RegistrarProveedor";
import { ListarTrabajadores } from "./pages/trabajador/ListarTrabajadores";
import { ModificarTrabajadores } from "./pages/trabajador/ModificarTrabajadores";
import { RegistrarTrabajadores } from "./pages/trabajador/RegistrarTrabajadores";
import { DetallesTrabajadores } from "./pages/trabajador/DetallesTrabajadores";
import { setUser } from "./store/reducers/userReducer";
import { helpHttp } from "./utils/helpHttp";
import { ListarComprobantes } from "./pages/comprobantes/ListarComprobantes";
import { RegistrarComprobantes } from "./pages/comprobantes/RegistrarComprobantes";
import { ModificarComprobantes } from "./pages/comprobantes/ModificarComprobantes";
import { ListarAlmacen } from "./pages/almacen/ListarAlmacen";
import { ListarCarta } from "./pages/carta/ListarCarta";
import { RegistrarCarta } from "./pages/carta/RegistrarCarta";
import { ModificarCarta } from "./pages/carta/ModificarCarta";
import { ListarIngredientesCarta } from "./pages/carta/ListarIngredientesCarta";
import { ModificarIngredientesCarta } from "./pages/carta/ModificarIngredientesCarta";
import { AgregarIngredienteCarta } from "./pages/carta/AgregarIngredienteCarta";
import { AgregarProducto } from "./pages/productos/AgregarProducto";
import { ListarVentas } from "./pages/venta/ListarVentas";
import { RegistrarVenta } from "./pages/venta/RegistrarVenta";
import { DetalleVentas } from "./pages/venta/DetalleVentas";
import { Notificaciones } from "./pages/notificaciones/Notificaciones";

function App() {
  const usuario = useSelector((state) => state.usuario);
  const api = helpHttp();
  const dispatch = useDispatch();
  useEffect(() => {
    const id = sessionStorage.getItem("usuario");
    if (id) {
      api
        .get(`${URL_USUARIO}/${id}`)
        .then((res) => {
          if (res.status === 200) {
            dispatch(
              setUser({
                data: res.data,
              })
            );
          }
        })
        .catch((err) => {});
    }
  }, []);
  return (
    <>
      {usuario.logged && <Header />}
      <Confirmacion />
      <main>
        <Routes>
          <Route
            path="/*"
            element={
              usuario.logged ? (
                <LayoutSimple />
              ) : (
                <Navigate to="/iniciar-sesion" />
              )
            }
          >
            {/* RUTAS DE USUARIO */}
            <Route index element={<Inicio />} />
            <Route path="perfil" element={<Perfil />} />
            <Route path="carta/*" element={<LayoutSimple />}>
              <Route index element={<ListarCarta />} />
              {/* SUB-RUTAS DE TRABAJADOR */}
              {usuario.idRol > 1 && (
                <>
                  <Route path="registrar" element={<RegistrarCarta />} />
                  <Route path=":idCarta/*" element={<LayoutSimple />}>
                    <Route index element={<ModificarCarta />} />
                    <Route path="ingredientes/*" element={<LayoutSimple />}>
                      <Route index element={<ListarIngredientesCarta />} />
                      <Route
                        path="registrar"
                        element={<AgregarIngredienteCarta />}
                      />
                      <Route
                        path=":idIngrediente"
                        element={<ModificarIngredientesCarta />}
                      />
                    </Route>
                  </Route>
                </>
              )}
            </Route>

            {/* RUTAS DE TRABAJADOR */}
            {usuario.idRol > 1 && (
              <>
                <Route path="proveedores/*" element={<LayoutSimple />}>
                  <Route index element={<ListarProveedores />} />
                  <Route path="registrar" element={<RegistrarProveedor />} />
                  <Route path=":id" element={<ModificarProveedor />} />
                </Route>
                <Route path="productos/*" element={<LayoutSimple />}>
                  <Route index element={<ListarProductos />} />
                  <Route path="registrar" element={<RegistrarProductos />} />
                  <Route path=":idProducto" element={<LayoutSimple />}>
                    <Route index element={<ModificarProducto />} />
                    <Route path="agregar" element={<AgregarProducto />} />
                  </Route>
                </Route>
                <Route path="trabajadores/*" element={<LayoutSimple />}>
                  <Route index element={<ListarTrabajadores />} />
                  <Route path="registrar" element={<RegistrarTrabajadores />} />
                  <Route
                    path=":idTrabajador/detalles"
                    element={<DetallesTrabajadores />}
                  />
                  <Route
                    path=":idTrabajador"
                    element={<ModificarTrabajadores />}
                  />
                </Route>
                <Route path="comprobantes/*" element={<LayoutSimple />}>
                  <Route index element={<ListarComprobantes />} />
                  <Route path="registrar" element={<RegistrarComprobantes />} />
                  <Route
                    path=":idComprobante"
                    element={<ModificarComprobantes />}
                  />
                </Route>
                <Route path="almacen" element={<ListarAlmacen />} />
                <Route path="carta/*" element={<LayoutSimple />}>
                  <Route index element={<ListarCarta />} />
                  <Route path="registrar" element={<RegistrarCarta />} />
                </Route>
                <Route path="ventas/*" element={<LayoutSimple />}>
                  <Route index element={<ListarVentas />} />
                  <Route path="registrar" element={<RegistrarVenta />} />
                  <Route path=":idVenta" element={<DetalleVentas />} />
                </Route>
                <Route path="notificaciones" element={<Notificaciones />} />
              </>
            )}

            {/* RUTAS DE ADMIN */}
            {usuario.idRol === 3 && (
              <Route path="usuarios" element={<ListarUsuarios />} />
            )}
          </Route>

          {/* RUTAS DE ACCESO */}
          <Route
            path="/iniciar-sesion"
            element={!usuario.logged ? <IniciarSesion /> : <Navigate to="/" />}
          />
          <Route path="/registrarse" element={<RegistrarUsuario />} />

          {/* RUTA 404 NOT FOUND */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
