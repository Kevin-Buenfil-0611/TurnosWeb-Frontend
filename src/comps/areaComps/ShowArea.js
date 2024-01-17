import axios from "axios";
import { useState, useEffect } from "react";
import TextoTitulo from "../textoTitulos";

//Dirección del backend para acceder a los métodos de la base de datos
const URI = 'http://localhost:8000/areas/'

const CompShowAreas = () => {

    //Procedimiento para mostrar todas las Áreas
    const [areas, setAreas] = useState([])
    useEffect(() => {
        getAreas()
    }, [])

    const getAreas = async () => {
        const res = await axios.get(URI)
        setAreas(res.data)
    }

    //Procedimiento para eliminar un Área
    const deleteArea = async (id) => {
        const res = await axios.put(`${URI}${id}`, {
            estatus: false
        })
        getAreas();
    }

    //Procedimiento para crear un Área
    const [nombre_area, setNombre_area] = useState('');
    const estatus = '1';
    const store = async (e) => {
        e.preventDefault();
        await axios.post(URI, { nombre_area: nombre_area, estatus: estatus });
        getAreas();
    }

    return (
        <>
            {/* Componente del título */}
            <TextoTitulo tamaño={"h1"} texto="Áreas" color="black"></TextoTitulo>
            <div className="table-responsive" style={{ marginRight: 10, marginLeft: 10 }}>
                <table className="table table-striped table-bordered border-black align-middle">
                    <thead className="table-dark">
                        {/* Encabezados de la tabla */}
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Área</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Ciclo para obtener la información de la DB */}
                        {areas.map((area) => (
                            <tr key={area.id}>
                                <th scope="row">{area.id}</th>
                                <td>{area.nombre_area}</td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => deleteArea(area.id)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Botón de Agregar Área */}
            <div className="d-flex justify-content-center">
                <button
                    className="btn btn-primary"
                    data-bs-toggle="modal" data-bs-target="#modal-create-area"
                    style={{
                        marginTop: 10, marginBottom: 10, backgroundColor: "#FA770F",
                        border: 0
                    }}
                >
                    Agregar Área
                </button>
            </div>

            {/* Modal de Agregar Área */}
            <div className="modal fade" id="modal-create-area" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            {/* Título del Modal */}
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Menú Crear Área</h1>
                            {/* Botón X de cerrar */}
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                onClick={() => getAreas()}></button>
                        </div>
                        <div className="modal-body">
                            {/* Formulario para agregar Área */}
                            <form onSubmit={store}>
                                <input
                                    placeholder="Nombre del área"
                                    value={nombre_area}
                                    onChange={(e) => setNombre_area(e.target.value)}
                                    type="text"
                                    className="form-control"
                                />
                                {/* Botón de Guardar */}
                                <div className="d-flex justify-content-center">
                                    <button className="btn btn-primary" type="submit" data-bs-dismiss="modal"
                                        style={{
                                            marginTop: 10, backgroundColor: "#FA770F", border: 0
                                        }}
                                        onClick={() => getAreas()}>
                                        Guardar</button>
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            {/* Botón de Cerrar */}
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal"
                                onClick={() => getAreas()}>Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default CompShowAreas;