import axios from "axios";
import { useState, useEffect } from "react";
import TextoTitulo from "../textoTitulos";

const URI = 'http://localhost:8000/cajas/';
const URIareas = 'http://localhost:8000/areas/';
const URIareacaja = 'http://localhost:8000/areacaja/';

//Lista que almacena los datos del checkbox
let ListaAreadId = []

const CompShowCajas = () => {

    //Detecar cambios en el checkbox
    var AreasCheckBoxes = document.querySelectorAll("input[type=checkbox][name=areasCheckBox]")
    AreasCheckBoxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', function () {
            ListaAreadId =
                Array.from(AreasCheckBoxes).filter(i => i.checked).map(i => i.value)
        })
    })

    //Procedimiento para mostrar todas las areasCajas
    const [areacajas, setAreaCajas] = useState([])
    useEffect(() => {
        getAreaCajas()
    }, [])

    const getAreaCajas = async () => {
        const res = await axios.get(URIareacaja)
        setAreaCajas(res.data)
    }

    //Procedimiento para eliminar un registro AreaCaja
    const deleteAreaCaja = async (id) => {
        const res = await axios.put(`${URIareacaja}${id}`, {
            estatus: false
        })
        getAreaCajas()
    }

    //Procedimiento para crear un Caja
    const [nombre_Caja, setNombre_Caja] = useState('');
    const estatus = '1';
    const store = async (e) => {
        e.preventDefault();
        await axios.post(URI, {
            nombre_Caja: nombre_Caja,
            estatus: estatus,
            areasID: ListaAreadId
        });
        getAreaCajas()
    }

    //Procedimiento para mostrar todas las Áreas
    const [areas, setAreas] = useState([])
    useEffect(() => {
        getAreas()
    }, [])

    const getAreas = async () => {
        const res = await axios.get(URIareas)
        setAreas(res.data)
    }

    return (
        <>
            {/* Componente del título */}
            <TextoTitulo tamaño={"h1"} texto="Cajas" color="black"></TextoTitulo>
            <div className="table-responsive" style={{ marginRight: 10, marginLeft: 10 }}>
                <table className="table table-striped table-bordered border-black align-middle">
                    <thead className="table-dark">
                        {/* Encabezados de la tabla */}
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Caja</th>
                            <th scope="col">Área</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Ciclo para obtener la información de la DB */}
                        {areacajas.map((areacaja) => (
                            <tr key={areacaja.id}>
                                <th scope="row" key={areacaja.id}>{areacaja.id}</th>
                                <td key={areacaja.id_caja}>{areacaja.nombre_caja}</td>
                                <td key={areacaja.id_area}>{areacaja.nombre_area}</td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => deleteAreaCaja(areacaja.id)}
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
                    data-bs-toggle="modal" data-bs-target="#modal-create-Caja"
                    style={{
                        marginTop: 10, marginBottom: 10,
                        backgroundColor: "#FA770F", border: 0
                    }}
                    onClick={() => getAreas()}
                >
                    Agregar Caja
                </button>
            </div>

            {/* Modal de Agregar Caja */}
            <div className="modal fade" id="modal-create-Caja" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            {/* Título del Modal */}
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Menú Crear Caja</h1>
                            {/* Botón X de cerrar */}
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                onClick={() => getAreaCajas()}></button>
                        </div>

                        {/* Formulario para agregar Área */}
                        <div className="modal-body">
                            <form onSubmit={store}>
                                <input
                                    placeholder="Nombre del Caja"
                                    value={nombre_Caja}
                                    onChange={(e) => setNombre_Caja(e.target.value)}
                                    type="text"
                                    className="form-control"
                                />

                                {/* Selección del área */}
                                <div style={{ marginTop: 10 }}>
                                    <h1 className="modal-title fs-5" id="staticBackdropLabel"
                                        style={{ marginBottom: 10 }}>Selecciona las Áreas a las que pertenece la Caja</h1>
                                    {/* Creación del checkbox */}
                                    {/* Ciclo por cada area se muestra un checkbox */}
                                    <div className="checkbox">
                                        {areas.map((area) => (
                                            <div className="form-check form-check-inline" key={area.id}
                                            >
                                                {/* Input que muestra el nombre del area y guarda su id */}
                                                <input className="form-check-input" name='areasCheckBox' type="checkbox" value={area.id}
                                                    id="areasCheckBox" key={area.id}
                                                />
                                                <label className="form-check-label" htmlFor="areasCheckBox" key={area.nombre_area}>
                                                    {area.nombre_area}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Botón Guardar */}
                                <div className="d-flex justify-content-center">
                                    <button className="btn btn-primary" type="submit" data-bs-dismiss="modal"
                                        style={{ marginTop: 20, backgroundColor: "#FA770F", border: 0 }}
                                    >
                                        Guardar</button>
                                </div>
                            </form>
                        </div>
                        {/* Modal de Cerrar */}
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal"
                                onClick={() => getAreaCajas()}>Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default CompShowCajas;