import React, { useState } from "react";
import './styles/stylesCaja.css';
import logoMunicipio from './LogoAyuntamiento.webp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'

const Caja = () => {
    //Función que permite leer un arreglo de nombres y crear botones dependiendo del número de elementos



    return (
        <>
            {/* Contenedor del encabezado */}
            <nav class="navbar bg-body-tertiary" className="encabezadoContainer">
                <h1 className="clockIcon"><FontAwesomeIcon icon={faClock} style={{ color: "#ffffff", }} /> </h1>
                <p class="h1" style={{
                    fontWeight: "bold", color: "white",
                    textAlign: "left", marginLeft: 10, fontFamily: "Nunito"
                }}>Caja</p>
                <img src={logoMunicipio} alt="Error" className="logoMunicipio" />
            </nav>


        </>

    );
};

export default Caja;
