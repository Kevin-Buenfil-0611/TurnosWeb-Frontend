import React, { useState, useEffect } from "react";
import './styles/stylesLogin.css';
import Encabezado from "./comps/encabezado";
import CompShowAreas from "./comps/areaComps/ShowArea";
import CompCreateArea from "./comps/areaComps/CreateArea";



const Crud = () => {

    return (
        <>
            {/* Componente del encabezado */}
            <Encabezado nombreIcon="bi bi-database-fill-gear" textoTitulo="Pantalla de Administrador"></Encabezado>

            {/* Barra de Navegación entre CRUDS */}
            <ul class="nav nav-pills mb-3" id="crud-tab" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="pills-areas-tab" data-bs-toggle="pill" data-bs-target="#pills-area" type="button" role="tab" aria-controls="pills-area" aria-selected="true">Áreas</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="pills-caja-tab" data-bs-toggle="pill" data-bs-target="#pills-caja" type="button" role="tab" aria-controls="pills-caja" aria-selected="false">Cajas</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="pills-usuarios-tab" data-bs-toggle="pill" data-bs-target="#pills-usuarios" type="button" role="tab" aria-controls="pills-usuarios" aria-selected="false">Usuarios</button>
                </li>

            </ul>

            <div class="tab-content" id="pills-tabContent">
                {/* Pestaña tabla áreas */}
                <div class="tab-pane fade show active" id="pills-area" role="tabpanel" aria-labelledby="pills-areas-tab" tabindex="0">
                    <CompShowAreas></CompShowAreas>
                </div>
                <div class="tab-pane fade" id="pills-caja" role="tabpanel" aria-labelledby="pills-caja-tab" tabindex="0">...
                </div>
                <div class="tab-pane fade" id="pills-usuarios" role="tabpanel" aria-labelledby="pills-usuarios-tab" tabindex="0">...
                </div>

            </div>





        </>
    );
};

export default Crud;
