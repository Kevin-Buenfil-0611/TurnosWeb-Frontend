import React from "react";
import './styles/stylesCaja.css';
import Encabezado from "./comps/encabezado";
import TextoTitulo from "./comps/textoTitulos";
import { Popconfirm } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

const Caja = () => {
    //Leer los turnos en espera
    function esperaTurnos() {
        const listaTurnos = ["Area1", "Area2", "Area3", "Area4"];
        const turnosEnEspera = listaTurnos.map(turnos =>
            <TextoTitulo tamaño={"h5"} texto={turnos} color="white"></TextoTitulo>
        );
        return turnosEnEspera;
    }
    return (
        <>
            {/* Contenedor del encabezado */}
            <Encabezado nombreIcon="bi bi-box-seam-fill" textoTitulo="Caja"></Encabezado>
            {/* División de la Lista de Espera e Información del Turno */}
            <div className="centrarCaja">

                {/* Contenedor de la Lista de Espera */}
                <div className="col-sm-12 col-md-3" style={{
                    paddingLeft: 5
                }}>
                    <div className="esperaContainer">
                        <div style={{ marginTop: 10, marginBottom: 10 }}>
                            <TextoTitulo tamaño={"h4"} texto="Lista de Espera" color="white" ></TextoTitulo>
                        </div>
                        <div className="row ">{esperaTurnos()}</div>
                    </div>
                </div>

                {/* Contenedor de la Información del turno */}
                <div className="col-sm-12 col-md-9">

                    {/* Contenedor Principal de la información del turno */}
                    <div className="d-flex flex-column align-content-center">
                        {/* Textos del título */}
                        <div className="flex-row ">
                            <TextoTitulo tamaño={"h2"} texto="Turno Actual"></TextoTitulo>
                            <TextoTitulo tamaño={"h3"} texto="Área: Catastro"></TextoTitulo>
                            <TextoTitulo tamaño={"h4"} texto="Caja: 1"></TextoTitulo>
                        </div>
                        {/* Contenedor de la información del turno */}
                        <div className="d-flex align-items-center justify-content-center">
                            <div className="infoTurno">
                                {/* Titulo del turno */}
                                <div style={{ marginTop: 20, marginBottom: 15 }}>
                                    <TextoTitulo tamaño={"h1"} texto="Turno #2" color="white"></TextoTitulo>
                                </div>
                                {/* Botones del turno */}
                                <div className="row justify-content-center align-items-center text-center">
                                    <div className="col-sm-12 col-md-6">
                                        <button type="button" className="btn btn-warning"
                                            style={{
                                                fontWeight: "bold", marginBottom: 20,
                                                marginLeft: 20, marginRight: 10, color: "white",
                                                borderradius: "2rem", border: "solid 0.2em",
                                                borderColor: "orangered", backgroundColor: "#ff9821"
                                            }}>Llamar Nuevamente</button>
                                    </div>
                                    <div className="col-sm-12 col-md-6">
                                        <Popconfirm title='Finalizar Turno'
                                            description="Confirma que el turno haya sido concluido"
                                            onConfirm={() => console.log("Turno concluido")}
                                            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                                            okButtonProps={{ style: { backgroundColor: '#FA770F', color: 'white' } }}
                                        >
                                            <button type="button" className="btn btn-warning" style={{
                                                fontWeight: "bold", marginBottom: 20,
                                                marginLeft: 10, marginRight: 20, color: "white",
                                                borderradius: "2rem", border: "solid 0.2em", borderColor: "orangered",
                                                backgroundColor: "#ff9821"
                                            }}>Finalizar Turno</button>
                                        </Popconfirm>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Botón para llamar turno */}
                        <div className="d-flex justify-content-center">
                            <Popconfirm title='Llamar nuevo turno'
                                description="¿Estás seguro de llamar otro turno? El turno actual será finalizado automáticamente"
                                onConfirm={() => console.log("Turno concluido")}
                                icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                                okButtonProps={{ style: { backgroundColor: '#FA770F', color: 'white' } }}
                            >
                                <button type="button" className="btn btn-warning" style={{
                                    marginTop: 30, marginBottom: 10,
                                    fontWeight: "bold", color: "white",
                                    borderradius: "2rem", border: "solid 0.2em", borderColor: "orangered",
                                    backgroundColor: "#ff9821"
                                }}>Llamar nuevo turno</button>
                            </Popconfirm>

                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default Caja;
