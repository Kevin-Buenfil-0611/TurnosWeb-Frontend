import React from "react";
import moment from "moment";
import './styles/stylesCaja.css';
import axios from "axios";
import Encabezado from "./comps/encabezado";
import TextoTitulo from "./comps/textoTitulos";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { Popconfirm } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

const URI = 'http://localhost:8000/turnos/'
//Checar la relacion de usuario con cajas para saber a ue caja va y obtener la info
//Checarlo desde la parte de la creación del usuario y del login
//Luego pasar la info al backend

const Caja = () => {

    //Acciones del Modal
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    //Título del Área que atiende la caja
    const AreaUsuario = localStorage.getItem("nombre_area");
    const TextoAreaUsuario = "Area: " + AreaUsuario

    //Área a la que pertenece el usuario
    const IdAreaUsuario = localStorage.getItem("area_id");

    //Usuario que atiende el turno y hora en que atiende
    const NombreUsuario = localStorage.getItem("usuario");

    //Procedimiento para mostrar todas los Turnos
    const [turnos, setTurnos] = useState([]);
    const [turnoActual, setTurnoActual] = useState();
    const [turnoAtendiendo, setTurnoAtendiendo] = useState();

    useEffect(() => {
        getTurnos();
        getTurnoAtendiendo();
    }, []);

    //No usar cola solo ordenar los elementos y usarlos en base a su fecha
    const getTurnos = async () => {
        const res = await axios.get(`${URI}${IdAreaUsuario}`);
        setTurnos(res.data);
    };

    //Devuelve los turnos atendiendo del usuario
    //No usar cola solo ordenar los elementos y usarlos en base a su fecha
    const getTurnoAtendiendo = async () => {
        const res = await axios.get(`${URI}${IdAreaUsuario}/${NombreUsuario}`);
        setTurnoAtendiendo(res.data);
    };

    //Crear procedimiento para modificar el turno al agarrarlo y cambiarle su estado a "Atendiendo"
    const llamarTurno = async () => {
        if (turnoAtendiendo) {
            // Si ya hay un turno siendo atendido, asignarlo a turnoActual
            setTurnoActual(turnoAtendiendo);
        } else if (turnoActual) {
            // Ya hay un turno, activar un modal con el mensaje correspondiente
            onOpen();
        } else {
            // No hay turno actual, utilizar el valor más reciente de turnoActual
            const nuevoTurnoActual = turnos[0];
            if (nuevoTurnoActual) {
                setTurnoActual(nuevoTurnoActual);
                // Usa el id del nuevo turnoActual en atendiendoTurno
                await atendiendoTurno(nuevoTurnoActual.id);
                getTurnos();
                getTurnoAtendiendo();
            } else {
                // No hay nuevos turnos para atender
                console.log("No hay nuevos turnos disponibles");
            }
        }
    }

    //Checar cómo puedo saber a qué area corresponde el usuario, crear union de usuario con caja
    //Procedimiento para poner al turno atendiendo
    const atendiendoTurno = async (id) => {
        const fechaActualAtendiendo = moment().format('YYYY-MM-DD HH:mm:ss');
        await axios.put(`${URI}${id}`, {
            estatus: "Atendiendo",
            turno_seleccionado: fechaActualAtendiendo,
            update_by: NombreUsuario,
            update_at: fechaActualAtendiendo,
            fk_idcaja: 1
        })
        getTurnos();
        getTurnoAtendiendo();
    }
    //Procedimiento para terminar el turno
    const finalizaTurno = async (id) => {
        const fechaActualFinalizar = moment().format('YYYY-MM-DD HH:mm:ss');
        await axios.put(`${URI}${id}`, {
            estatus: "Finalizado",
            turno_atendido: fechaActualFinalizar,
            update_by: NombreUsuario,
            update_at: fechaActualFinalizar
        })
        //Se ejecuta finalizar turno
        setTurnoActual();
        setTurnoAtendiendo();
        getTurnos();
        getTurnoAtendiendo()
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
                        {turnos.map((turno) => (
                            <TextoTitulo
                                key={turno.id} // Utiliza una clave única para cada elemento
                                tamaño="h5"
                                texto={`${turno.nombre_area} ${turno.id}`}
                                color="white"
                            />
                        ))}
                    </div>
                </div>

                {/* Contenedor de la Información del turno */}
                <div className="col-sm-12 col-md-9">

                    {/* Contenedor Principal de la información del turno */}
                    <div className="d-flex flex-column align-content-center">
                        {/* Textos del título */}
                        <div className="flex-row ">
                            <TextoTitulo tamaño={"h2"} texto="Turno Actual"></TextoTitulo>
                            <TextoTitulo tamaño={"h3"} texto={TextoAreaUsuario}></TextoTitulo>
                        </div>

                        {/* Contenedor de la información del turno */}
                        <div className="d-flex align-items-center justify-content-center">
                            <div className="infoTurno">
                                {turnoActual ? (
                                    <>
                                        <div style={{ marginTop: 20, marginBottom: 15 }}>
                                            <TextoTitulo tamaño="h1" texto={`Turno #${turnoActual.id}`} color="white" />
                                        </div>
                                        <div className="row justify-content-center align-items-center text-center">
                                            <div className="col-sm-12 col-md-6">
                                                <button
                                                    type="button"
                                                    className="btn btn-warning"
                                                    style={{
                                                        fontWeight: 'bold',
                                                        marginBottom: 20,
                                                        marginLeft: 20,
                                                        marginRight: 10,
                                                        color: 'white',
                                                        borderRadius: '2rem',
                                                        border: 'solid 0.2em',
                                                        borderColor: 'orangered',
                                                        backgroundColor: '#ff9821',
                                                    }}
                                                >
                                                    Llamar Nuevamente
                                                </button>
                                            </div>
                                            <div className="col-sm-12 col-md-6">
                                                <Popconfirm
                                                    title="Finalizar Turno"
                                                    description="Confirma que el turno haya sido concluido"
                                                    onConfirm={() => finalizaTurno(turnoActual.id)}
                                                    icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                                                    okButtonProps={{ style: { backgroundColor: '#FA770F', color: 'white' } }}
                                                >
                                                    <button
                                                        type="button"
                                                        className="btn btn-warning"
                                                        style={{
                                                            fontWeight: 'bold',
                                                            marginBottom: 20,
                                                            marginLeft: 20,
                                                            marginRight: 10,
                                                            color: 'white',
                                                            borderRadius: '2rem',
                                                            border: 'solid 0.2em',
                                                            borderColor: 'orangered',
                                                            backgroundColor: '#ff9821',
                                                        }}
                                                    >
                                                        Finalizar Turno
                                                    </button>
                                                </Popconfirm>
                                            </div>
                                        </div>
                                        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                                            <ModalContent>
                                                {(onClose) => (
                                                    <>
                                                        <ModalHeader className="flex flex-col gap-1">Turno existente</ModalHeader>
                                                        <ModalBody>
                                                            <p>
                                                                Primero finaliza el turno actual para llamar a otro turno
                                                            </p>
                                                        </ModalBody>
                                                        <ModalFooter>
                                                            <Button color="danger" variant="light" onPress={onClose}>
                                                                Cerrar
                                                            </Button>
                                                        </ModalFooter>
                                                    </>
                                                )}
                                            </ModalContent>
                                        </Modal>
                                    </>
                                ) : (
                                    <>
                                        <div style={{ margin: 15 }}>
                                            <TextoTitulo tamaño={"h4"} texto="No hay turno selecionado" color="white" ></TextoTitulo>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>


                        {/* Botón para llamar turno */}
                        <div className="d-flex justify-content-center">
                            <Popconfirm title='Llamar nuevo turno'
                                description="Comprueba que el turno ya haya sido finalizado"
                                onConfirm={() => { llamarTurno() }}
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
