import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth";

const RequireAuth = ({ permisosConcedidos }) => {
    //Cambiar el link del home page para que al iniciar una nueva página cheque la autorizacion del 
    //usuario como en el login
    const { auth } = useAuth();
    const location = useLocation();
    return (
        auth?.listaPermisos?.find(permiso => permisosConcedidos?.includes(permiso))
            ? <Outlet />
            : auth?.usuario ? <Navigate to='/NoAutorizado' state={{ from: location }} replace /> //si no tiene los permisos
                : <Navigate to='/NoAutenticado' state={{ from: location }} replace /> //si no está autenticado
    )
}
export default RequireAuth;