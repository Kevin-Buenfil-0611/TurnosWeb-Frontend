import axios from "axios";
import { useState, useEffect } from "react";
import TextoTitulo from "./textoTitulos";
import { Input, Button } from "@nextui-org/react";
import { Popconfirm } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import React from "react";

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

    //*************** Eliminar un Área ************************
    const deleteArea = async (id) => {
        const usuarioCreate = localStorage.getItem("usuario");
        await axios.put(`${URI}${id}`, {
            estatus: false,
            update_by: usuarioCreate
        })
        getAreas();
    }

    // *********************** Crear un Área ***********************
    const [nombre_area, setNombre_area] = useState('');

    const store = async (e) => {
        const usuarioCreate = localStorage.getItem("usuario");
        e.preventDefault();
        await axios.post(URI, {
            nombre_area: nombre_area, estatus: true,
            create_by: usuarioCreate
        });
        getAreas();
    }

    // Validar la información del input
    const validateArea = (nombre_area) => nombre_area.trim() !== '';

    const isValidArea = React.useMemo(() => {
        return validateArea(nombre_area);
    }, [nombre_area]);

    //Resetea el valor de nombre_area
    const resetCreateForm = () => {
        setNombre_area('');
    };


    //****************** Modificar el nombre del Área ************************
    const modify = async (e) => {
        const usuarioModify = localStorage.getItem("usuario");
        e.preventDefault();
        await axios.put(`${URI}updateNombre`, {
            id: areaModId, nombre_area: nombreAreaMod,
            update_by: usuarioModify
        });
        getAreas();
    }

    // ************************ Modal Editar Área  *******************
    const [nombreAreaMod, setNombreAreaMod] = useState('');
    const [areaModId, setAreaModId] = useState('');
    const [areaVieja, setAreaVieja] = useState('');

    const getAreaMod = (nombre_area, id) => {
        setNombreAreaMod(nombre_area)
        setAreaVieja(nombre_area)
        setAreaModId(id)
    }
    //Validar datos del input
    const validateAreaMod = (nombreAreaMod, areaVieja) => nombreAreaMod.trim() !== '' &&
        nombreAreaMod.trim() !== areaVieja;

    const isValidAreaMod = React.useMemo(() => {
        return validateAreaMod(nombreAreaMod, areaVieja);
    }, [nombreAreaMod, areaVieja]);

    const resetModifyForm = () => {
        setNombreAreaMod('');
        setAreaModId('');
    };

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
                        {areas ? (
                            areas.map((area) => (
                                <tr key={area.id}>
                                    <th scope="row">{area.id}</th>
                                    <td>{area.nombre_area}</td>
                                    <td>
                                        <div className="d-flex justify-content-center">
                                            <Popconfirm title='Borrar Área'
                                                description="¿Estás seguro de eliminar esta área? Afectará a otras tablas"
                                                onConfirm={() => deleteArea(area.id)}
                                                icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                                                okButtonProps={{ style: { backgroundColor: '#FA770F', color: 'white' } }}
                                            >
                                                <button
                                                    className="btn btn-danger"
                                                    style={{ margin: "3px 5px 3px 5px" }}>
                                                    Eliminar
                                                </button>
                                            </Popconfirm>
                                            <button
                                                className="btn btn-info"
                                                data-bs-toggle="modal" data-bs-target="#modal-edit-area"
                                                style={{
                                                    color: "white", backgroundColor: "#004DDE",
                                                    border: 0, margin: "3px 5px 3px 5px"
                                                }}
                                                onClick={() => {
                                                    resetModifyForm();
                                                    getAreaMod(area.nombre_area, area.id);
                                                }}>
                                                Editar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <></>
                        )}
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
                    onClick={() => resetCreateForm()}
                >
                    Agregar Área
                </button>
            </div>

            {/* -------- Modal de Agregar Área -------- */}
            <div className="modal fade" id="modal-create-area" data-bs-backdrop="static" data-bs-keyboard="false"
                tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            {/* Título del Modal */}
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Menú Crear Área</h1>
                            {/* Botón X de cerrar */}
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                onClick={() => getAreas()} />
                        </div>
                        <div className="modal-body ">
                            <h1 className="modal-title fs-6" id="staticBackdropLabel"
                                style={{ marginBottom: 10 }}>Escribe el nombre del Área</h1>
                            {/* Formulario para agregar Área */}
                            <form onSubmit={store}>
                                <Input
                                    value={nombre_area}
                                    type="text"
                                    label="Nombre del Área"
                                    variant="bordered"
                                    isValidArea={!isValidArea}
                                    color={isValidArea ? "success" : "danger"}
                                    errorMessage={!isValidArea && "Escribe un nombre váido"}
                                    onChange={(e) => setNombre_area(e.target.value)}
                                    className="max-w-xs"
                                />
                                {/* Botón de Guardar */}
                                <div className="d-flex justify-content-center"
                                    style={{ marginTop: 40 }}>

                                    {isValidArea ? (
                                        // Si isValidArea es true, el botón no se muestra
                                        <Button variant="faded" className="bg-orange text-white"
                                            type="submit" data-bs-dismiss="modal" >
                                            Guardar
                                        </Button>
                                    ) : (
                                        // Si isValidArea es false, se muestra el botón
                                        <Button isDisabled variant="faded" className="bg-orange text-white"
                                            type="submit" data-bs-dismiss="modal" >
                                            Guardar
                                        </Button>
                                    )}
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            {/* Botón de Cerrar */}
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal"
                                onClick={() => getAreas()}>
                                Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ------- Modal de Editar Área -------- */}
            <div className="modal fade" id="modal-edit-area" data-bs-backdrop="static" data-bs-keyboard="false"
                tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            {/* Título del Modal */}
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Menú Modificar Área</h1>
                            {/* Botón X de cerrar */}
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                onClick={() => getAreas()} />
                        </div>
                        <div className="modal-body ">
                            <h1 className="modal-title fs-6" id="staticBackdropLabel"
                                style={{ marginBottom: 10 }}>Es obligatorio modificar el campo</h1>
                            <h1 className="modal-title fs-6" id="staticBackdropLabel"
                                style={{ marginBottom: 10 }}>Escribe el nombre del Área</h1>
                            {/* Formulario para agregar Área */}
                            <form onSubmit={modify}>
                                <Input
                                    value={nombreAreaMod}
                                    type="text"
                                    label="Nombre del Área"
                                    variant="bordered"
                                    isValidArea={!isValidAreaMod}
                                    color={isValidAreaMod ? "success" : "danger"}
                                    errorMessage={!isValidAreaMod && "Escribe un nuevo nombre váido"}
                                    onChange={(e) => setNombreAreaMod(e.target.value)}
                                    className="max-w-xs"
                                />
                                {/* Botón de Guardar */}
                                <div className="d-flex justify-content-center"
                                    style={{ marginTop: 40 }}>

                                    {isValidAreaMod ? (
                                        // Si isValidArea es true, el botón no se muestra
                                        <Button variant="faded" className="bg-orange text-white"
                                            type="submit" data-bs-dismiss="modal" >
                                            Guardar
                                        </Button>
                                    ) : (
                                        // Si isValidArea es false, se muestra el botón
                                        <Button isDisabled variant="faded" className="bg-orange text-white"
                                            type="submit" data-bs-dismiss="modal" >
                                            Guardar
                                        </Button>
                                    )}
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            {/* Botón de Cerrar */}
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal"
                                onClick={() => getAreas()}>
                                Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>




        </>
    )
};

export default CompShowAreas;