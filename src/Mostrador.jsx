import React from "react";
import './styles/stylesPubGnral.css';
import Encabezado from "./comps/encabezado";
import TextoTitulo from "./comps/textoTitulos";
import axios from "axios";
import moment from "moment";
import { Popconfirm } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";

const URI = 'http://localhost:8000/areas/'
const URITurnos = 'http://localhost:8000/turnos/'
const Mostrador = () => {

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
        const fechaActualCreate = moment().format('YYYY-MM-DD HH:mm:ss');
        const estatus = "Pendiente"
        await axios.post(URITurnos, {
            create_by: usuarioCreate, create_at: fechaActualCreate,
            estatus: estatus, fk_idarea: area_id
        });
    }
    function Grid() {
        // Calcula el número de filas y columnas
        const gridSize = Math.ceil(Math.sqrt(areas.length));
        return (
            <div className="grid" style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}>
                {areas.map((area) => (
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

                ))}
            </div>
        );
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
