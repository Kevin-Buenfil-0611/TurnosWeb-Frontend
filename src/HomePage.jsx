import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Encabezado from "./comps/encabezado";
import TextoTitulo from "./comps/textoTitulos";
import { Button } from "@nextui-org/react";

const HomePage = () => {
    //Rutas de navegación
    const navigate = useNavigate();
    const location = useLocation();
    const pageCaja = location.state?.from?.pathname || "/Caja";
    const pageCrud = location.state?.from?.pathname || "/Crud";
    const pageMostrador = location.state?.from?.pathname || "/Mostrador";
    const noAutorizado = location.state?.from?.pathname || "/NoAutirizado";

    //Información del local storage para validar credenciales del usuario
    const autorizado = localStorage.getItem("autorizado");
    const permisosStorage = localStorage.getItem("listaPermisos");
    let listaPermisos = permisosStorage.split(',');

    const goCaja = async (e) => {
        //Valida los permisos y en caso de notenerlos, lo redirige a una página de error
        e.preventDefault();
        try {
            if (autorizado) {
                navigate(pageCaja, { replace: true });
            } else {
                navigate(noAutorizado, { replace: true });
            }

        } catch (err) {
            navigate(noAutorizado, { replace: true });
        }
    }

    const goCrud = async (e) => {
        //Valida los permisos y en caso de notenerlos, lo redirige a una página de error
        e.preventDefault();
        try {
            if (autorizado) {
                navigate(pageCrud, { replace: true });
            } else {
                navigate(noAutorizado, { replace: true });
            }
        } catch (err) {
            navigate(noAutorizado, { replace: true });
        }
    }

    const goMostrador = async (e) => {
        //Valida los permisos y en caso de notenerlos, lo redirige a una página de error
        e.preventDefault();
        try {
            if (autorizado) {
                navigate(pageMostrador, { replace: true });
            } else {
                navigate(noAutorizado, { replace: true });
            }
        } catch (err) {
            navigate(noAutorizado, { replace: true });
        }
    }

    return (
        <>
            {/* Contenedor del encabezado */}
            <Encabezado nombreIcon="bi bi-calendar-check-fill" textoTitulo="Home"></Encabezado>

            <div>
                <TextoTitulo tamaño={"h1"} texto="Selecciona el Área al que quieres entrar" color="black"></TextoTitulo>
            </div>
            <div>
                {listaPermisos.includes("Caja") ? (
                    // Si es true, el botón se muestra
                    <Button variant="faded" className="bg-ff9821 text-black"
                        onClick={goCaja}>
                        Caja
                    </Button>
                ) : (
                    // Si es false, no se muestra el botón
                    <Button isDisabled variant="faded" className="bg-ff9821 text-black"
                        onClick={goCaja}>
                        Caja
                    </Button>
                )}

                {listaPermisos.includes("Administrador") ? (
                    // Si es true, el botón se muestra
                    <Button variant="faded" className="bg-ff9821 text-black"
                        onClick={goCrud}>
                        Administración
                    </Button>
                ) : (
                    // Si es false, no se muestra el botón
                    <Button isDisabled variant="faded" className="bg-ff9821 text-black"
                        onClick={goCrud}>
                        Administración
                    </Button>
                )}

                {listaPermisos.includes("Mostrador") ? (
                    // Si es true, el botón se muestra
                    <Button variant="faded" className="bg-ff9821 text-black"
                        onClick={goMostrador}>
                        Mostrador
                    </Button>
                ) : (
                    // Si es false, no se muestra el botón
                    <Button isDisabled variant="faded" className="bg-ff9821 text-black"
                        onClick={goMostrador}>
                        Mostrador
                    </Button>
                )}

            </div>

        </>
    )
}
export default HomePage;