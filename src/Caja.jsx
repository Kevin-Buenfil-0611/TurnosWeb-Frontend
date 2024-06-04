import React from "react";
import './styles/stylesCaja.css';
import axios from "axios";
import Encabezado from "./comps/encabezado";
import TextoTitulo from "./comps/textoTitulos";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Popconfirm } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

const URI = 'http://localhost:8000/turnos/';
const URIarea = 'http://localhost:8000/areas/';
const URIareaCaja = 'http://localhost:8000/areacaja/';
const URIareaUsuario = 'http://localhost:8000/areausuario/';
const URILogin = 'http://localhost:8000/login/comprobarToken';

const Caja = () => {
    //Variables para navegar
    const navigate = useNavigate();
    const location = useLocation();
    const pageLogin = location.state?.from?.pathname || "/Login";
    const noAutorizado = location.state?.from?.pathname || "/NoAutorizado";
    const goBack = () => navigate('/');

    //Permisos del usuario
    const permisosStorage = localStorage.getItem("listaPermisos");
    let listaPermisos = permisosStorage.split(',');


    // ************** Verificar Token del usuario  *************
    var InfoAcceso;
    async function ComprobarToken() {
        const tokenUsuario = localStorage.getItem('x-token');
        const usuarioID = localStorage.getItem("usuario_id");
        const response = await axios.get(`${URILogin}`, {
            headers: {
                token: tokenUsuario
            },
            body: {
                usuario_id: usuarioID
            }
        })
        return InfoAcceso = response.data
    }
    ComprobarToken().then(() => {
        if (InfoAcceso.autorizado === false) {
            navigate(pageLogin, { replace: true });
        } else {
            localStorage.setItem('x-token', InfoAcceso.token);
            if (!listaPermisos.includes("Caja")) {
                navigate(noAutorizado, { replace: true });
            }
        }
    });
    //Acciones del Modal
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    //Información del Usuario
    const CajaActual = localStorage.getItem("caja_id");
    const UsuarioID = localStorage.getItem("usuario_id");

    //Procedimiento para mostrar todas los Turnos
    const [turnos, setTurnos] = useState([]);
    const [turnoActual, setTurnoActual] = useState();
    const [turnoAtendiendo, setTurnoAtendiendo] = useState();
    const [nombreAreas, setNombreAreas] = useState();
    //******************* Modificar para que permita leer una lista de áreas *********************
    const getNombreAreas = async () => {
        let ListaDeAreas = []
        if (listaPermisos.includes("Áreas de la Caja")) {
            const res = await axios.get(`${URIareaCaja}${CajaActual}`);
            ListaDeAreas = res.data
        } else if (listaPermisos.includes("Áreas del Usuario")) {
            const res = await axios.get(`${URIareaUsuario}${UsuarioID}`);
            ListaDeAreas = res.data
        }
        const resAreas = await axios.post(`${URIarea}areaUsuario`,
            { listaAreas: ListaDeAreas });

        setNombreAreas(resAreas.data);
    };

    useEffect(() => {
        getNombreAreas()
    }, [])

    const getTurnos = async () => {
        let ListaDeAreas = []
        if (listaPermisos.includes("Áreas de la Caja")) {
            const res = await axios.get(`${URIareaCaja}${CajaActual}`);
            ListaDeAreas = res.data

        } else if (listaPermisos.includes("Áreas del Usuario")) {
            const res = await axios.get(`${URIareaUsuario}${UsuarioID}`);
            ListaDeAreas = res.data
        }
        const res = await axios.post(`${URI}turnos`,
            { lista: ListaDeAreas });
        setTurnos(res.data);
    };

    //Devuelve los turnos atendiendo del usuario
    const getTurnoAtendiendo = async () => {
        const NombreUsuario = localStorage.getItem("usuario");
        const res = await axios.get(`${URI}turnos/${NombreUsuario}`);
        setTurnoAtendiendo(res.data);
    };


    useEffect(() => {
        getTurnos();
        getTurnoAtendiendo();
        const intervalo = setInterval(() => {
            getTurnos();
            getTurnoAtendiendo();
        }, 10000); // Actualiza cada 30 segundos
        // Limpia el intervalo cuando el componente se desmonta
        return () => clearInterval(intervalo);
    }, []);

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

    //Procedimiento para poner al turno atendiendo
    const atendiendoTurno = async (id) => {
        const UsuarioAtendiendo = localStorage.getItem("usuario");
        const Caja_ID = localStorage.getItem("caja_id");
        await axios.put(`${URI}${id}/turnoAtendiendo`, {
            estatus: "Atendiendo",
            update_by: UsuarioAtendiendo,
            fk_idcaja: Caja_ID
        })
        getTurnos();
        getTurnoAtendiendo();
    }
    //Procedimiento para terminar el turno
    const finalizaTurno = async (id) => {
        const UsuarioFinalizar = localStorage.getItem("usuario");
        await axios.put(`${URI}${id}/turnoFinalizado`, {
            estatus: "Finalizado",
            update_by: UsuarioFinalizar,
        })
        //Se ejecuta finalizar turno
        setTurnoActual();
        setTurnoAtendiendo();
        getTurnos();
        getTurnoAtendiendo();
    }

    //Título del Área que atiende la caja
    const TextoAreaUsuario = "Area: " + nombreAreas;

    //Título del Área que atiende la caja
    const CajaUsuario = localStorage.getItem("nombre_caja");
    const TextoCajaUsuario = "Caja: " + CajaUsuario;


    return (
        <>
            {/* Contenedor del encabezado */}
            <Encabezado nombreIcon="bi bi-box-seam-fill" textoTitulo="Caja"></Encabezado>
            {/* Botón para regresar home */}
            <div className="d-flex justify-content-start align-items-center"
                style={{ margin: "1vh" }}>
                <Button variant="faded" className="bg-orange text-white"
                    onClick={goBack}>
                    Home
                </Button>
            </div>
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
                        {turnos.length === 0 ? (
                            <div style={{
                                color: "white", textAlign: "center",
                                fontSize: "3vw"
                            }}>No hay turnos disponibles</div>
                        ) : (
                            turnos.map((turno) => (
                                <TextoTitulo
                                    key={turno.id}
                                    tamaño="h5"
                                    texto={`${turno.nombre_area} ${turno.folio}`}
                                    color="white"
                                />
                            ))
                        )}
                    </div>
                </div>

                {/* Contenedor de la Información del turno */}
                <div className="col-sm-12 col-md-9">

                    {/* Contenedor Principal de la información del turno */}
                    <div className="d-flex flex-column align-content-center" >
                        {/* Textos del título */}
                        <div className="flex-row align-self-center" style={{ maxWidth: '90%' }}>
                            <TextoTitulo tamaño={"h2"} texto="Turno Actual"></TextoTitulo>
                            <TextoTitulo tamaño={"h2"} texto={TextoCajaUsuario}></TextoTitulo>
                            <h4 style={{
                                fontWeight: "bold", textAlign: "left",
                                fontFamily: "Nunito", whiteSpace: "nowrap",
                                overflow: "hidden", textOverflow: "ellipsis",
                                overflowWrap: "break-word"
                            }}>
                                {TextoAreaUsuario}
                            </h4>
                        </div>

                        {/* Contenedor de la información del turno */}
                        <div className="d-flex align-items-center justify-content-center">
                            <div className="infoTurno">
                                {turnoActual ? (
                                    <>
                                        <div style={{ marginTop: 20, marginBottom: 15 }}>
                                            <TextoTitulo tamaño="h1" texto={`Turno #${turnoActual.folio}`} color="white" />
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
