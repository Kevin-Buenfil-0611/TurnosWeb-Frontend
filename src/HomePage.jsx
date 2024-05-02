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

const HomePage = () => {
    //Rutas de navegación
    const navigate = useNavigate();
    const location = useLocation();
    const goBack = () => navigate('/');
    const pageCaja = location.state?.from?.pathname || "/Caja";
    const pageCrud = location.state?.from?.pathname || "/Crud";
    const pageMostrador = location.state?.from?.pathname || "/Mostrador";
    const noAutorizado = location.state?.from?.pathname || "/NoAutorizado";

    //Información del local storage para validar credenciales del usuario
    const autorizado = localStorage.getItem("autorizado");
    const permisosStorage = localStorage.getItem("listaPermisos");
    let listaPermisos = permisosStorage.split(',');

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

    //Dependiendo de la área de caja o usuario que se ocupe, actualizar los id de las areas en ls
    const goCaja = async () => {
        //Valida los permisos y en caso de notenerlos, lo redirige a una página de error
        try {
            if (autorizado) {
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
            if (autorizado) {

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
            if (autorizado) {
                navigate(pageMostrador, { replace: true });
            } else {
                navigate(noAutorizado, { replace: true });
            }
        } catch (err) {
            navigate(noAutorizado, { replace: true });
        }
    }

    const goNoAutorizado = async () => {
        //Valida los permisos y en caso de notenerlos, lo redirige a una página de error
        try {
            navigate(noAutorizado, { replace: true });

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
                        onClick={goBack}>
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