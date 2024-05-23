import React from "react";
import './styles/stylesPubGnral.css';
import Encabezado from "./comps/encabezado";
import TextoTitulo from "./comps/textoTitulos";
import axios from "axios";
import { Popconfirm } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@nextui-org/react";

const URI = 'http://localhost:8000/areas/';
const URITurnos = 'http://localhost:8000/turnos/';
const URILogin = 'http://localhost:8000/login/comprobarToken';

const Mostrador = () => {

    //Variables para navegar
    const navigate = useNavigate();
    const location = useLocation();
    const pageLogin = location.state?.from?.pathname || "/Login";
    const noAutorizado = location.state?.from?.pathname || "/NoAutorizado";
    const goBack = () => navigate('/');

    //Información del local storage del usuario
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
            if (!listaPermisos.includes("Mostrador")) {
                navigate(noAutorizado, { replace: true });
            }
        }
    });

    //Procedimiento para mostrar todas las Áreas
    const [areas, setAreas] = useState([])
    useEffect(() => {
        getAreas()
    }, [])
    const getAreas = async () => {
        const res = await axios.get(URI)
        setAreas(res.data)
    }
    const createTurno = async (area_id) => {
        const usuarioCreate = localStorage.getItem("usuario");
        const estatus = "Pendiente"
        await axios.post(URITurnos, {
            create_by: usuarioCreate,
            estatus: estatus, fk_idarea: area_id
        });
    }
    function Grid() {
        // Calcula el número de filas y columnas
        const gridSize = Math.ceil(Math.sqrt(areas.length));
        return (
            <div className="grid" style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}>
                {areas ? (areas.map((area) => (
                    <Popconfirm title='Crear turno'
                        description="Confirma la creación del turno"
                        onConfirm={() => createTurno(area.id)}
                        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                        okButtonProps={{ style: { backgroundColor: '#FA770F', color: 'white' } }}
                    >
                        <button key={area.id} className="buttonAreas">
                            <text className="textAreas">{area.nombre_area}</text>
                        </button>
                    </Popconfirm>
                ))) : (
                    <></>
                )}
            </div>
        );
    }

    return (
        <>
            {/* Contenedor del encabezado */}
            <Encabezado nombreIcon="bi bi-calendar-check-fill" textoTitulo="Lista de Areas"></Encabezado>
            <div className="d-flex justify-content-start align-items-center"
                style={{ margin: "1vh" }}>
                <Button variant="faded" className="bg-orange text-white"
                    onClick={goBack}>
                    Home
                </Button>
            </div>
            {/* Contenedor donde muestra las áreas */}
            <div className="centrar">
                <div class="areasContainer">
                    <div class="form-group" style={{ marginBottom: 10, marginTop: 5 }}>
                        <TextoTitulo tamaño={"h2"} texto="Seleccione el Área Deseada" color="white"></TextoTitulo>
                        <div>
                            <Grid></Grid>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Mostrador;
