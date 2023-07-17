import { FormRegistrarUsuario } from "../../components/pure/form/FormRegistrarUsuario"

export const RegistrarUsuario= () => {
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            minHeight: "calc(100vh - var(--step-1) * 2)"
        }}>
            <h1>Registrarse</h1>
            <FormRegistrarUsuario/>
        </div>
    )
}
