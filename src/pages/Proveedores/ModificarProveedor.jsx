import { useRef } from "react";
import { useParams } from "react-router";
import { BtnRegresar } from "../../components/pure/BtnRegresar";
import { FormProveedores } from "../../components/pure/form/FormProveedores";
import { helpHttp } from "../../utils/helpHttp";

export const ModificarProveedor = () => {
    return (
        <>
            <h1>Modificar Proveedor</h1>
            <FormProveedores />
        </>
    )
}
