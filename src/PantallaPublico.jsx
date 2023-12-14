import React, { useState } from "react";
import './styles/stylesPubGnral.css';
import logoMunicipio from './LogoAyuntamiento.webp'
import Area from './comps/areaButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'

const PantallaPublico = () => {
    //Función que permite leer un arreglo de nombres y crear botones dependiendo del número de elementos
    function crearAreas() {
        const nombreAreas = ["Area1", "Area2", "Area3", "Area4", "Area5", "Area6", "Area7", "Area9", "Area9"];
        const listaAreas = nombreAreas.map(area =>
            <button className="buttonAreas">
                <text className="textAreas">{area}</text>
            </button>);
        return listaAreas;
    }

    return (
        <>
            {/* Contenedor del encabezado */}
            <nav class="navbar bg-body-tertiary" className="encabezadoContainer">
                <h1 className="clockIcon"><FontAwesomeIcon icon={faClock} style={{ color: "#ffffff", }} /> </h1>
                <p class="h1" style={{
                    fontWeight: "bold", color: "white",
                    textAlign: "left", marginLeft: 10, fontFamily: "Nunito"
                }}>Selección de Turnos</p>
                <img src={logoMunicipio} alt="Error" className="logoMunicipio" />
            </nav>
            {/* Contenedor donde muestra las áreas */}
            <div className="centrar">
                <div class="areasContainer">
                    <div class="form-group" style={{ marginBottom: 10 }}>
                        <p class="h2" style={{ fontWeight: "bold", color: "white", textAlign: "center" }}>Selecciona el Área Deseada</p>
                        <div className="d-flex flex-wrap">{crearAreas()}</div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default PantallaPublico;
