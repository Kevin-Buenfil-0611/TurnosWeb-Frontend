import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Encabezado from "./comps/encabezado";
import TextoTitulo from "./comps/textoTitulos";
import {
    Button, Modal, ModalContent, ModalHeader, ModalBody,
    ModalFooter, useDisclosure, Select, SelectItem
} from "@nextui-org/react";

//Dirección del backend
const URICajaUsuario = 'http://localhost:8000/cajausuario/';
const URICaja = 'http://localhost:8000/cajas/';
const URILogin = 'http://localhost:8000/login/comprobarToken';

const HomePage = () => {
    //Rutas de navegación
    const navigate = useNavigate();
    const location = useLocation();
    const pageLogin = location.state?.from?.pathname || "/Login";
    const pageCaja = location.state?.from?.pathname || "/Caja";
    const pageCrud = location.state?.from?.pathname || "/Crud";
    const pageMostrador = location.state?.from?.pathname || "/Mostrador";
    const noAutorizado = location.state?.from?.pathname || "/NoAutorizado";

    //Información del local storage del usuario
    const permisosStorage = localStorage.getItem("listaPermisos") || "";
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
            if (!listaPermisos.includes("Home")) {
                navigate(noAutorizado, { replace: true });
            }
        }
    });

    //Acciones del modal
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [cajasUsuario, setCajasUsuario] = useState();
    const [cajaActual, setCajaActual] = useState();
    //Información del usuario
    const UsuarioID = localStorage.getItem("usuario_id");

    //Obtener las cajas a las que pertenece el usuario
    const getCajasUsuario = async () => {
        const res = await axios.get(`${URICajaUsuario}${UsuarioID}`);
        setCajasUsuario(res.data)
    }
    useEffect(() => {
        getCajasUsuario();
    }, []);

    //Devuelve al login
    const goLogin = async () => {
        navigate(pageLogin, { replace: true });
    }
    //Dependiendo de la área de caja o usuario que se ocupe, actualizar los id de las areas en ls
    const goCaja = async () => {
        //Valida los permisos y en caso de notenerlos, lo redirige a una página de error
        try {
            if (listaPermisos.includes("Caja")) {
                const res = await axios.get(`${URICaja}${cajaActual}`);
                const caja = res.data
                localStorage.setItem("caja_id", cajaActual);
                localStorage.setItem("nombre_caja", caja.nombre_caja);
                navigate(pageCaja, { replace: true });
            } else {
                navigate(noAutorizado, { replace: true });
            }
        } catch (err) {
            navigate(noAutorizado, { replace: true });
        }
    }

    const goCrud = async () => {
        //Valida los permisos y en caso de notenerlos, lo redirige a una página de error
        try {
            if (listaPermisos.includes("Administrador")) {
                navigate(pageCrud, { replace: true });
            } else {
                navigate(noAutorizado, { replace: true });
            }
        } catch (err) {
            navigate(noAutorizado, { replace: true });
        }
    }

    const goMostrador = async () => {
        //Valida los permisos y en caso de notenerlos, lo redirige a una página de error
        try {
            if (listaPermisos.includes("Mostrador")) {
                navigate(pageMostrador, { replace: true });
            } else {
                navigate(noAutorizado, { replace: true });
            }
        } catch (err) {
            navigate(noAutorizado, { replace: true });
        }
    }


    return (
        <>
            {/* Contenedor del encabezado */}
            <Encabezado nombreIcon="bi bi-calendar-check-fill" textoTitulo="Home"></Encabezado>
            <div>
                <div className="d-flex justify-content-start align-items-center"
                    style={{ margin: "1vh" }}>
                    <Button variant="faded" className="bg-orange text-white"
                        onClick={goLogin}>
                        Login
                    </Button>
                </div>
                <TextoTitulo tamaño={"h1"} texto="Selecciona el módulo al que quieres entrar" color="black"></TextoTitulo>
            </div>
            <div className="d-flex justify-content-center" style={{ marginTop: 20 }}>
                {listaPermisos.includes("Caja") ? (
                    // Si es true, el botón se muestra
                    <>
                        <Button variant="faded" className="bg-orange text-white"
                            onClick={onOpen}>
                            Caja
                        </Button>
                        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                            <ModalContent>
                                {(onClose) => (
                                    <>
                                        <ModalHeader className="flex flex-col gap-1">Selecciona la caja a la que perteneces</ModalHeader>
                                        <ModalBody>
                                            <Select
                                                label="Caja Actual"
                                                placeholder="Selecciona la caja a atender"
                                                className="max-w-xs"
                                                value={cajaActual}
                                                onChange={(e) => setCajaActual(e.target.value)}
                                            >
                                                {cajasUsuario.map((caja) => (
                                                    <SelectItem key={caja.caja_id} value={caja.caja_id}>
                                                        {caja.nombre_caja}
                                                    </SelectItem>
                                                ))}
                                            </Select>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="danger" variant="light" onPress={onClose}>
                                                Cerrar
                                            </Button>
                                            <Button style={{ backgroundColor: "#FA770F", color: "white" }} onPress={goCaja}>
                                                Ir a la caja
                                            </Button>
                                        </ModalFooter>
                                    </>
                                )}
                            </ModalContent>
                        </Modal>
                    </>
                ) : (
                    // Si es false, no se muestra el botón
                    <></>
                )}
                <div style={{ margin: "2vh" }}></div>
                {listaPermisos.includes("Administrador") ? (
                    // Si es true, el botón se muestra
                    <Button variant="faded" className="bg-orange text-white"
                        onClick={goCrud}>
                        Administración
                    </Button>
                ) : (
                    // Si es false, no se muestra el botón
                    <></>
                )}
                <div style={{ margin: "2vh" }}></div>
                {listaPermisos.includes("Mostrador") ? (
                    // Si es true, el botón se muestra
                    <Button variant="faded" className="bg-orange text-white"
                        onClick={goMostrador}>
                        Mostrador
                    </Button>
                ) : (
                    // Si es false, no se muestra el botón
                    <></>
                )}
            </div>
        </>
    )
}
export default HomePage;