import { useAuth } from "../context/AuthContext"

export default function PruebaAutenticacion() {

    const { isAuthenticated } = useAuth();
    console.log('userLogged', isAuthenticated);
    return (
        <>
            <h1>Prueba de autenticación</h1>
            {isAuthenticated && <h1>USUARIO AUTENTICADO</h1>}
        </>
    );
}
