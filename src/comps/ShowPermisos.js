import axios from "axios";
import { useState, useEffect } from "react";
import TextoTitulo from "./textoTitulos";
import { Input, Button } from "@nextui-org/react";
import { Popconfirm } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import React from "react";

//Dirección del backend para acceder a los métodos de la base de datos
const URI = 'http://localhost:8000/permisos/'

const CompShowPermisos = () => {

    //Procedimiento para mostrar todas los permisos
    const [permisos, setPermisos] = useState([])
    useEffect(() => {
        getPermisos()
    }, [])

    const getPermisos = async () => {
        const res = await axios.get(URI)
        setPermisos(res.data)
    }

    // ********************* Crear un Permiso ***********************
    const [nombre_permiso, setNombre_permiso] = useState('');
    const [descripcionPermiso, setDescripcionPermiso] = useState('');
    const store = async (e) => {
        const usuarioCreate = localStorage.getItem("usuario");
        e.preventDefault();
        await axios.post(URI, {
            nombre: nombre_permiso, descripcion: descripcionPermiso,
            estatus: true, create_by: usuarioCreate
        });
        getPermisos();
    }

    // Validar la información de los input
    const validatePermiso = (nombre_Permiso) => nombre_Permiso.trim() !== '';
    const validateDescPermiso = (descripcionPermiso) => descripcionPermiso.trim() !== '';

    const isValidPermiso = React.useMemo(() => {
        return validatePermiso(nombre_permiso);
    }, [nombre_permiso]);

    const isValidDescPermiso = React.useMemo(() => {
        return validateDescPermiso(descripcionPermiso);
    }, [descripcionPermiso]);

    const isValidFormCreate = isValidPermiso === true && isValidDescPermiso === true;

    //Resetea el valor de los input
    const resetCreateForm = () => {
        setNombre_permiso('');
        setDescripcionPermiso('');
    };

    // **************** Eliminar un permiso ******************
    const deletePermiso = async (id) => {
        const usuarioCreate = localStorage.getItem("usuario");
        await axios.put(`${URI}${id}`, {
            estatus: false, update_by: usuarioCreate
        })
        getPermisos();
    }

    // ------ Modal Editar Permiso  -------
    const [PermisoModId, setPermisoModId] = useState('');
    const [nombrePermisoMod, setNombrePermisoMod] = useState('');
    const [PermisoVieja, setPermisoVieja] = useState('');
    const [descripcionPermisoMod, setDescripcionPermisoMod] = useState('');
    const [descripcionVieja, setDescripcionVieja] = useState('');

    const getPermisoMod = (id, nombre, descripcion) => {
        setNombrePermisoMod(nombre);
        setPermisoVieja(nombre);
        setPermisoModId(id);
        setDescripcionPermisoMod(descripcion);
        setDescripcionVieja(descripcion);
    }
    //*************** Modificar el nombre del permiso ****************
    const modify = async (e) => {
        const usuarioModify = localStorage.getItem("usuario");
        e.preventDefault();
        await axios.put(`${URI}${PermisoModId}/updateNombre`, {
            nombre: nombrePermisoMod, descripcion: descripcionPermisoMod,
            update_by: usuarioModify
        });
        getPermisos();
    }

    //Validar datos del input modificar
    const validatePermisoMod = (nombrePermisoMod, PermisoVieja) => nombrePermisoMod.trim() !== '' &&
        nombrePermisoMod !== PermisoVieja;

    const validateDescPermisoMod = (descripcionPermisoMod, descripcionVieja) => descripcionPermisoMod.trim() !== '' &&
        descripcionPermisoMod !== descripcionVieja;

    const isValidPermisoMod = React.useMemo(() => {
        return validatePermisoMod(nombrePermisoMod, PermisoVieja);
    }, [nombrePermisoMod, PermisoVieja]);

    const isValidDescPermisoMod = React.useMemo(() => {
        return validateDescPermisoMod(descripcionPermisoMod, descripcionVieja);
    }, [descripcionPermisoMod, descripcionVieja]);

    const isValidFormModify = isValidPermisoMod === true || isValidDescPermisoMod === true;

    const resetModifyForm = () => {
        setNombrePermisoMod('');
        setPermisoModId('');
    };

    return (
        <>
            {/* Componente del título */}
            <TextoTitulo tamaño={"h1"} texto="Permisos" color="black"></TextoTitulo>
            <div className="table-responsive" style={{ marginRight: 10, marginLeft: 10 }}>
                <table className="table table-striped table-bordered border-black align-middle">
                    <thead className="table-dark">
                        {/* Encabezados de la tabla */}
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Permiso</th>
                            <th scope="col">Descripción</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Ciclo para obtener la información de la DB */}
                        {permisos ? (
                            permisos.map((permiso) => (
                                <tr key={permiso.id}>
                                    <th scope="row">{permiso.id}</th>
                                    <td>{permiso.nombre}</td>
                                    <td>{permiso.descripcion}</td>
                                    <td >
                                        <Popconfirm title='Borrar Permiso'
                                            description="¿Estás seguro de eliminar este permiso? Afectará a otros elementos"
                                            onConfirm={() => {
                                                deletePermiso(permiso.id);
                                                getPermisos();
                                            }}
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
                                            data-bs-toggle="modal" data-bs-target="#modal-edit-permiso"
                                            style={{
                                                color: "white", backgroundColor: "#004DDE",
                                                border: 0, margin: "3px 5px 3px 5px"
                                            }}
                                            onClick={() => {
                                                resetModifyForm();
                                                getPermisoMod(permiso.id, permiso.nombre, permiso.descripcion);
                                            }}>
                                            Editar
                                        </button>
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
                    data-bs-toggle="modal" data-bs-target="#modal-create-permiso"
                    style={{
                        marginTop: 10, marginBottom: 10, backgroundColor: "#FA770F",
                        border: 0
                    }}
                    onClick={() => resetCreateForm()}
                >
                    Agregar Permiso
                </button>
            </div>

            {/* -------- Modal de Agregar Permiso -------- */}
            <div className="modal fade" id="modal-create-permiso" data-bs-backdrop="static" data-bs-keyboard="false"
                tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            {/* Título del Modal */}
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Menú Crear Permiso</h1>
                            {/* Botón X de cerrar */}
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                onClick={() => getPermisos()} />
                        </div>
                        <div className="modal-body ">
                            <h1 className="modal-title fs-6" id="staticBackdropLabel"
                                style={{ marginBottom: 10 }}>Escribe el nombre del permiso</h1>
                            {/* ------- Formulario para agregar Permiso  --------- */}
                            {/* Input nombre del Permiso */}
                            <form onSubmit={store}>
                                <Input
                                    value={nombre_permiso}
                                    type="text"
                                    label="Nombre del Permiso"
                                    variant="bordered"
                                    isValidPermiso={!isValidPermiso}
                                    color={isValidPermiso ? "success" : "danger"}
                                    errorMessage={!isValidPermiso && "Escribe un nombre váido"}
                                    onChange={(e) => setNombre_permiso(e.target.value)}
                                    className="max-w-xs"
                                />
                                {/* Input descripción del Permiso */}
                                <h1 className="modal-title fs-6" id="staticBackdropLabel"
                                    style={{ marginTop: 10 }}>Escribe la descripción del permiso</h1>

                                <Input
                                    value={descripcionPermiso}
                                    type="text"
                                    label="Descripción del Permiso"
                                    variant="bordered"
                                    isValidPermiso={!isValidDescPermiso}
                                    color={isValidDescPermiso ? "success" : "danger"}
                                    errorMessage={!isValidDescPermiso && "Escribe un nombre váido"}
                                    onChange={(e) => setDescripcionPermiso(e.target.value)}
                                    className="max-w-xs"
                                />

                                {/* Botón de Guardar */}
                                <div className="d-flex justify-content-center"
                                    style={{ marginTop: 40 }}>
                                    {isValidFormCreate ? (
                                        // Si isValidPermiso es true, el botón no se muestra
                                        <Button variant="faded" className="bg-orange text-white"
                                            type="submit" data-bs-dismiss="modal" >
                                            Guardar
                                        </Button>
                                    ) : (
                                        // Si isValidPermiso es false, se muestra el botón
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
                                onClick={() => getPermisos()}>
                                Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ------- Modal de Editar Permiso -------- */}
            <div className="modal fade" id="modal-edit-permiso" data-bs-backdrop="static" data-bs-keyboard="false"
                tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            {/* Título del Modal */}
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Menú Modificar Permiso</h1>
                            {/* Botón X de cerrar */}
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                onClick={() => getPermisos()} />
                        </div>
                        <div className="modal-body ">
                            <h1 className="modal-title fs-6" id="staticBackdropLabel"
                                style={{ marginBottom: 10 }}>Es obligatorio modificar al menos un campo</h1>
                            <h1 className="modal-title fs-6" id="staticBackdropLabel"
                                style={{ marginBottom: 10 }}>Modifica el nombre del permiso</h1>
                            {/* Formulario para agregar Área */}
                            <form onSubmit={modify}>
                                <Input
                                    value={nombrePermisoMod}
                                    type="text"
                                    label="Nombre del Permiso"
                                    variant="bordered"
                                    isValidPermiso={!isValidPermisoMod}
                                    color={isValidPermisoMod ? "success" : "danger"}
                                    errorMessage={!isValidPermisoMod && "Escribe un nuevo nombre váido"}
                                    onChange={(e) => setNombrePermisoMod(e.target.value)}
                                    className="max-w-xs"
                                />

                                <h1 className="modal-title fs-6" id="staticBackdropLabel"
                                    style={{ marginTop: 10 }}>Modifica la descripción del Permiso</h1>

                                <Input
                                    value={descripcionPermisoMod}
                                    type="text"
                                    label="Nombre del Permiso"
                                    variant="bordered"
                                    isValidPermiso={!isValidDescPermisoMod}
                                    color={isValidDescPermisoMod ? "success" : "danger"}
                                    errorMessage={!isValidDescPermisoMod && "Escribe una nuevo descrición váida"}
                                    onChange={(e) => setDescripcionPermisoMod(e.target.value)}
                                    className="max-w-xs"
                                />

                                {/* Botón de Guardar */}
                                <div className="d-flex justify-content-center"
                                    style={{ marginTop: 40 }}>

                                    {isValidFormModify ? (
                                        // Si isValidPermiso es true, el botón no se muestra
                                        <Button variant="faded" className="bg-orange text-white"
                                            type="submit" data-bs-dismiss="modal" >
                                            Guardar
                                        </Button>
                                    ) : (
                                        // Si isValidPermiso es false, se muestra el botón
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
                                onClick={() => getPermisos()}>
                                Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
};

export default CompShowPermisos;