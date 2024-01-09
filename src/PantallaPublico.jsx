import React from "react";
import './styles/stylesPubGnral.css';
import Encabezado from "./comps/encabezado";
import TextoTitulo from "./comps/textoTitulos";

const PantallaPublico = () => {
    //Función que permite leer un arreglo de nombres y crear botones dependiendo del número de elementos
    function crearAreas() {
        const nombreAreas = ["Area1", "Area2", "Area3", "Area4", "Area5", "Area6",
            "Area7", "Area9", "Area9"];
        const listaAreas = nombreAreas.map(area =>
            <button className="buttonAreas">
                <text className="textAreas">{area}</text>
            </button>);
        return listaAreas;
    }

    return (
        <>
            {/* Contenedor del encabezado */}
            <Encabezado nombreIcon="bi bi-calendar-check-fill" textoTitulo="Lista de Areas"></Encabezado>
            {/* Contenedor donde muestra las áreas */}
            <div className="centrar">
                <div class="areasContainer">
                    <div class="form-group" style={{ marginBottom: 10, marginTop: 10 }}>
                        <TextoTitulo tamaño={"h2"} texto="Seleccione el Área Deseada" color="white"></TextoTitulo>
                        <div className="d-flex flex-wrap">{crearAreas()}</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PantallaPublico;
