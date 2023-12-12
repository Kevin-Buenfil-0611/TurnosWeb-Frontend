import React, { useState } from "react";
import './styles/stylesPubGnral.css';
import logoMunicipio from './LogoAyuntamiento.webp'
import Area from './comps/areaButton'

const PantallaPublico = () => {

    function Area(props) {
        return <button className="buttonAreas">
            <text className="textAreas">{props.nombreArea}</text>
        </button>;
    }

    return (
        <div className="containerPrincipal">
            <div className="encabezadoContainer">
                <h1 className="encabezadoText"> Selección de turnos</h1>
                <img src={logoMunicipio} alt="Error" className="logoMunicipio" />
            </div>

            <div className="tittleContainer">
                <h1 className="title">Elige el área que necesites</h1>
                <div className="areasContainer">
                    <Area nombreArea="Catastro"> </Area>
                    <Area nombreArea="Tesorería"> </Area>
                    <Area nombreArea="Cobro"> </Area>
                    <Area nombreArea="Ayuda"> </Area>
                    <Area nombreArea="General"> </Area>
                    <Area nombreArea="Pagos"> </Area>
                    <Area nombreArea="Area 7"> </Area>
                    <Area nombreArea="Area 8"> </Area>
                    <Area nombreArea="Area 9"> </Area>
                </div>
            </div>


        </div>
    );
};

export default PantallaPublico;
