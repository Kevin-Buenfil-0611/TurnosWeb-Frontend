import React from "react";
import Encabezado from "./comps/encabezado";
import TextoTitulo from "./comps/textoTitulos";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

const NoAutenticado = () => {
    const navigate = useNavigate();
    const goBack = () => navigate('/');

    return (
        <>
            {/* Contenedor del encabezado */}
            <Encabezado nombreIcon="bi bi-calendar-check-fill" textoTitulo="Error"></Encabezado>

            <div>
                <TextoTitulo tamaño={"h1"} texto="No está autenticado" color="black"></TextoTitulo>
                <TextoTitulo tamaño={"h3"} texto="Póngase en contacto con el administrador" color="black"></TextoTitulo>
            </div>

            <div className="d-flex justify-content-center align-items-center">
                <Button variant="faded" className="bg-orange text-white"
                    onClick={goBack}>
                    Regresa al inicio
                </Button>
            </div>

        </>


    )
}

export default NoAutenticado;