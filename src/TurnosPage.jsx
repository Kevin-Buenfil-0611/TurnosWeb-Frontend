import React, { useState } from "react";
import Encabezado from "./comps/encabezado";
import TextoTitulo from "./comps/textoTitulos";

const TurnosPage = () => {
    //Leer los turnos en espera
    //Volver a checar si aquí realizo el map
    function esperaTurnos() {
        const listaTurnos = ["Area1", "Area2", "Area3", "Area4"];
        const turnosEnEspera = listaTurnos.map(turnos =>
            <TextoTitulo tamaño={"h5"} texto={turnos} color="white"></TextoTitulo>
        );
        return turnosEnEspera;
    }

    return (
        <>

            <Encabezado nombreIcon="bi bi-ticket-detailed-fill" textoTitulo="Lista de Turnos"></Encabezado>

            <div className="d-flex " style={{ marginTop: 10 }}>
                {/* Lista de los turnos que se están atendiendo */}
                <div className="col-7 ">
                    <div className="d-flex justify-content-center" >
                        <TextoTitulo tamaño={"h1"} texto="Turnos Atendiendo" color="black"></TextoTitulo>
                    </div>
                    <div className="d-flex justify-content-center" style={{ marginLeft: 5 }}>
                        <div className="table-tesponsive">
                            <table className="table table-bordered">
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope="col"> Area</th>
                                        <th scope="col"> Caja</th>
                                        <th scope="col"> Turno</th>
                                    </tr>
                                    {/* Hacer un map para crear las filas
                                    dependiendo del número de cajas y que muestre el turno que
                                    se está atendendo (ordenado por cajas)
                                    Checar si un turno debe estar unido a un area o a una caja
                                    en  la base de datos */}
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">Catastro </th>
                                        <td>1</td>
                                        <td>13</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Tesoreria </th>
                                        <td>2</td>
                                        <td>14</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Recursos Humanos</th>
                                        <td>3</td>
                                        <td>15</td>
                                    </tr>
                                </tbody>

                            </table>
                        </div>

                    </div>
                </div>
                {/* Lista de los turnos en Espera */}
                <div className="col-5"  >
                    <div className="d-flex justify-content-center" >
                        <TextoTitulo tamaño={"h1"} texto="Turnos en Espera" color="black"></TextoTitulo>
                    </div>
                    <div className="d-flex justify-content-center" style={{
                        backgroundColor: "#FC8B0D", borderRadius: "2rem",
                        border: "solid 0.2rem", borderColor: "orangered",
                        flexDirection: "column", margin: "5px 10px 5px 10px"
                    }}>
                        <TextoTitulo tamaño={"h3"} texto="Catastro" color="white"></TextoTitulo>
                        <div>{esperaTurnos()}</div>
                    </div>
                    <div className="d-flex justify-content-center" style={{
                        backgroundColor: "#FC8B0D", borderRadius: "2rem",
                        border: "solid 0.2rem", borderColor: "orangered",
                        flexDirection: "column", margin: "5px 10px 5px 10px"
                    }}>
                        <TextoTitulo tamaño={"h3"} texto="Tesorería" color="white"></TextoTitulo>
                        <div>{esperaTurnos()}</div>
                    </div>

                </div>
            </div>


        </>
    )
};
export default TurnosPage;