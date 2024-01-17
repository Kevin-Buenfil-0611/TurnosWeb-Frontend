import axios from "axios";
import { useState, useEffect } from "react";
import TextoTitulo from "../textoTitulos";

const URI = 'http://localhost:8000/usuarios/';
const URIareas = 'http://localhost:8000/areas/';

const CompShowUsuarios = () => {

    //Procedimiento para mostrar todas los Usuarios
    const [usuarios, setUsuarios] = useState([])
    useEffect(() => {
        getUsuarios()
    }, [])

    const getUsuarios = async () => {
        const res = await axios.get(URI)
        setUsuarios(res.data)
    }

    //Procedimiento para eliminar un Usuario
    const deleteUsuario = async (id) => {
        const res = await axios.put(`${URI}${id}`, {
            estatus: false
        })
        getUsuarios();
    }

    //Procedimiento para crear un Usuario
    const [nombre_usuario, setNombre_usuario] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [fk_Idarea, setFk_Idarea] = useState('');
    const estatus = '1';
    const store = async (e) => {
        e.preventDefault();
        await axios.post(URI, {
            nombre_usuario: nombre_usuario, contraseña: contraseña,
            estatus: estatus, fk_idarea: fk_Idarea
        });
        getUsuarios();
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
            <TextoTitulo tamaño={"h1"} texto="Usuarios" color="black"></TextoTitulo>
            <div className="table-responsive" style={{ marginRight: 10, marginLeft: 10 }}>
                <table className="table table-striped table-bordered border-black align-middle">
                    <thead className="table-dark">
                        {/* Encabezados de la tabla */}
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Usuario</th>
                            <th scope="col">Contraseña</th>
                            <th scope="col">Área</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Ciclo para obtener la información de la DB */}
                        {usuarios.map((usuario) => (
                            <tr key={usuario.id}>
                                <th scope="row">{usuario.id}</th>
                                <td>{usuario.nombre_usuario}</td>
                                <td>{usuario.contraseña}</td>
                                <td>{usuario.area.nombre_area}</td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => deleteUsuario(usuario.id)}
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
                    data-bs-toggle="modal" data-bs-target="#modal-create-usuario"
                    style={{
                        marginTop: 10, marginBottom: 10,
                        backgroundColor: "#FA770F", border: 0
                    }}
                    onClick={() => getAreas()}
                >
                    Agregar Usuario
                </button>
            </div>


            {/* Modal de Agregar Área */}
            <div className="modal fade" id="modal-create-usuario" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            {/* Título del Modal */}
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Menú Crear Usuario</h1>
                            {/* Botón X de cerrar */}
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                onClick={() => getUsuarios()}></button>
                        </div>
                        {/* Formulario para agregar Área */}
                        <div className="modal-body">
                            {/* Input Nombre del Usuario */}
                            <form onSubmit={store}>
                                <input
                                    placeholder="Nombre del Usuario"
                                    value={nombre_usuario}
                                    onChange={(e) => setNombre_usuario(e.target.value)}
                                    type="text"
                                    className="form-control"
                                />

                                {/* Input Contraseña */}
                                <input
                                    placeholder="Contraseña"
                                    style={{ marginTop: 15 }}
                                    value={contraseña}
                                    onChange={(e) => setContraseña(e.target.value)}
                                    type="text"
                                    className="form-control"
                                />
                                {/* Selección del área */}
                                <div className="form-floating" style={{ marginTop: 20 }}>
                                    <select className="form-select" id="areasSelect" aria-label="Floating label select example"
                                        onChange={(e) => setFk_Idarea(e.target.value)}>
                                        <option defaultValue={''}>Selecciona un Área</option>
                                        {areas.map((area) => (
                                            <option value={area.id} key={area.id}>{area.nombre_area}</option>
                                        ))}
                                    </select>
                                    <label htmlFor="areasSelect">Área Seleccionada</label>
                                </div>

                                {/* Botón Guardar */}
                                <div className="d-flex justify-content-center">
                                    <button className="btn btn-primary" type="submit" data-bs-dismiss="modal"
                                        style={{ marginTop: 20, backgroundColor: "#FA770F", border: 0 }}
                                        onClick={() => getUsuarios()}>
                                        Guardar</button>
                                </div>
                            </form>

                        </div>
                        <div className="modal-footer">
                            {/* Modal de Cerrar */}
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal"
                                onClick={() => getUsuarios()}>Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default CompShowUsuarios;