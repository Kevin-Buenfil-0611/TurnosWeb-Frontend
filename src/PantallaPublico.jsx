import React from "react";
import './styles/stylesPubGnral.css';
import Encabezado from "./comps/encabezado";
import TextoTitulo from "./comps/textoTitulos";
import axios from "axios";
import { useState, useEffect } from "react";

const URI = 'http://localhost:8000/areas/'
const PantallaPublico = () => {

    //Procedimiento para mostrar todas las Áreas
    const [areas, setAreas] = useState([])
    useEffect(() => {
        getAreas()
    }, [])
    const getAreas = async () => {
        const res = await axios.get(URI)
        setAreas(res.data)
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
                        <div className="d-flex flex-wrap">
                            {
                                areas.map(area =>
                                    <button className="buttonAreas">
                                        <text className="textAreas">{area.nombre_area}</text>
                                    </button>)
                            }</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PantallaPublico;
