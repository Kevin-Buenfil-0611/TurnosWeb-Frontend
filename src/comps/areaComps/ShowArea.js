import axios from "axios";
import { useState, useEffect } from "react";
import CompEditArea from "./EditArea";
import TextoTitulo from "../textoTitulos";
import CompCreateArea from "./CreateArea";


const URI = 'http://localhost:8000/areas/'

const CompShowAreas = () => {
    const [areas, setAreas] = useState([])
    useEffect(() => {
        getAreas()
    }, [])
    //Procedimiento para mostrar todas las Areas
    const getAreas = async () => {
        const res = await axios.get(URI)
        setAreas(res.data)
    }

    //Procedimiento para eliminar un Area
    const deleteArea = async (id) => {
        const res = await axios.delete(`${URI}${id}`)
        getAreas();
    }

    const getAreaId = async (id) => {
        const res = await axios.get(`${URI}${id}`);

    }


    return (
        <>
            {/* Componente del título */}
            <TextoTitulo tamaño={"h1"} texto="Áreas" color="black"></TextoTitulo>
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Área</th>
                            <th scope="col">Estatus</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {areas.map((area) => (
                            <tr key={area.id}>
                                <th scope="row">{area.id}</th>
                                <td>{area.nombre_area}</td>
                                <td>{area.estatus ? 'Activo' : 'Inactivo'}</td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => deleteArea(area.id)}
                                    >
                                        Eliminar
                                    </button>
                                    {' '}
                                    <button
                                        className="btn btn-info"
                                        data-bs-toggle="modal" data-bs-target="#modal-edit-area"
                                        onClick={() => getAreaId(area.id)}
                                    >
                                        Editar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* Botón de Agregar Área */}
                <div className="d-flex justify-content-center">
                    <button
                        className="btn btn-primary"
                        data-bs-toggle="modal" data-bs-target="#modal-create-area"
                        style={{ marginTop: 10, marginBottom: 10 }}
                    >
                        Agregar Área
                    </button>
                </div>
            </div>

            {/* Modal de Agregar Área */}
            <div class="modal fade" id="modal-create-area" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="staticBackdropLabel">Menú Crear Área</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <CompCreateArea></CompCreateArea>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>


            {/* Modal de Editar Área */}
            <div class="modal fade" id="modal-edit-area" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="false">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="staticBackdropLabel">Menú Editar</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <CompEditArea></CompEditArea>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
};

export default CompShowAreas;