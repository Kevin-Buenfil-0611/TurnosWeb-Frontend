import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import TextoTitulo from "./textoTitulos";
import { CheckboxGroup, Checkbox, Button, Input } from "@nextui-org/react";
import { Popconfirm } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

//Dirección del backend para acceder a los métodos de la base de datos
const URI = 'http://localhost:8000/cajas/';
const URIareas = 'http://localhost:8000/areas/';
const URIareacaja = 'http://localhost:8000/areacaja/';

const CompShowCajas = () => {

    //Procedimiento para mostrar todas las areasCajas
    const [areacajas, setAreaCajas] = useState([])
    useEffect(() => {
        getAreaCajas()
    }, [])

    const getAreaCajas = async () => {
        const res = await axios.get(URIareacaja)
        setAreaCajas(res.data)
    }

    //Procedimiento para mostrar todas las areasCajas
    const [cajas, setCajas] = useState([])
    useEffect(() => {
        getCajas()
    }, [])

    const getCajas = async () => {
        const res = await axios.get(URI)
        setCajas(res.data)
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

    // ***** Métodos para el modal Crear ******

    //Permite detectar si el checkbox está marcado o no
    const [isValidCheckbox, setValidCheckbox] = useState(true);
    const [areasSelected, setAreasSelected] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [nombre_Caja, setNombre_Caja] = useState('');

    const handleValueChange = (value) => {
        setAreasSelected(value);
        setValidCheckbox(value.length > 0);
    };

    const handleSelectAllChange = () => {
        const allAreaIds = areas.map((area) => area.id);
        if (selectAll) {
            setAreasSelected([]);
            setValidCheckbox(false);
        } else {
            setAreasSelected(allAreaIds);
            setValidCheckbox(true);
        }
        setSelectAll(!selectAll);
    };

    //Procedimiento para validar los inputs de las Cajas
    const validateCaja = (nombre_Caja) => nombre_Caja.trim() !== '';
    const isValidCaja = React.useMemo(() => {
        return validateCaja(nombre_Caja);
    }, [nombre_Caja]);

    //Validar si se muestra o no el botón de guardar
    const isValidCajaForm = isValidCheckbox && isValidCaja;


    // ********* Eliminar Caja **************
    const deleteCaja = async (id) => {
        const usuarioModify = localStorage.getItem("usuario");
        await axios.put(`${URI}${id}`, {
            estatus: false, update_by: usuarioModify,
        })
        getCajas()
    }

    //********* Crear una Caja ***************
    const store =
        async (e) => {
            const usuarioCreate = localStorage.getItem("usuario");
            e.preventDefault();
            await axios.post(URI, {
                nombre_Caja: nombre_Caja, estatus: true, areasID: areasSelected,
                create_by: usuarioCreate
            });
            getCajas()
        }

    //Resetea el modal de Create Caja
    const resetFormCreate = () => {
        setNombre_Caja('');
        setAreasSelected([]);
        setSelectAll(false);
        setValidCheckbox(false);
    };


    //***************** Modificar el nombre de la caja ******************

    //Procedimiento para modificar un Caja
    const modifyNombreCaja = async (e) => {
        const usuarioModify = localStorage.getItem("usuario");
        e.preventDefault();
        await axios.put(`${URI}${cajaModId}/updateNombreCaja`, {
            nombre_caja: nombreCajaMod,
            update_by: usuarioModify
        });
        getCajas();
    }

    const [nombreCajaMod, setNombreCajaMod] = useState('');
    const [cajaModId, setCajaModId] = useState('');
    const [cajaVieja, setCajaVieja] = useState('');

    const getNombreCajaMod = (nombre_caja, id) => {
        setNombreCajaMod(nombre_caja)
        setCajaVieja(nombre_caja)
        setCajaModId(id)
    }
    //Validar datos del input
    const validateCajaMod = (nombreCajaMod, cajaVieja) => nombreCajaMod.trim() !== '' &&
        nombreCajaMod.trim() !== cajaVieja;

    const isValidNombreCajaMod = React.useMemo(() => {
        return validateCajaMod(nombreCajaMod, cajaVieja);
    }, [nombreCajaMod, cajaVieja]);

    const resetModifyNombreForm = () => {
        setNombreCajaMod('');
        setCajaModId('');
    };

    // **************** Modificar las áreas de la caja *********************

    //Procedimiento para modificar un Caja
    const modify = async (e) => {
        const usuarioModify = localStorage.getItem("usuario");
        e.preventDefault();
        await axios.put(`${URIareacaja}Mod/${cajaId}`, {
            nuevasAreasMod: nuevasAreasMod, caja_id: cajaId,
            update_by: usuarioModify
        });
        getAreaCajas();
        resetFormMod();
    }
    //Obtiene las áreas a las que pertenece la caja
    const [isValidAreasCheckbox, setIsValidAreasCheckbox] = useState(false);
    const [nuevasAreasMod, setNuevasAreasMod] = useState([]);
    const [viejasAreasMod, setViejasAreasMod] = useState([]);
    const [cajaId, setCajaId] = useState();

    const getAreasPorCaja = async (caja_id) => {
        try {
            let ListaAreasPerCaja = areacajas.filter(
                areacaja => areacaja.caja_id === caja_id).map(
                    areacaja => areacaja.area_id);

            setCajaId(caja_id);
            setIsValidAreasCheckbox(ListaAreasPerCaja.length > 0)
            setNuevasAreasMod(ListaAreasPerCaja);
            setViejasAreasMod(ListaAreasPerCaja);
        } catch (error) {
            console.error('Error al obtener datos de la caja:', error);
        }
    };

    //Permite detectar si el checkbox está marcado o no
    const [selectAllMod, setSelectAllMod] = useState(false);
    const handleModValueChange = (value) => {
        setNuevasAreasMod(value);
        setIsValidAreasCheckbox(value.length > 0)
    };

    const handleModSelectAllChange = () => {
        const allAreasModIds = areas.map((area) => area.id);
        if (selectAllMod) {
            setNuevasAreasMod([]);
            setIsValidAreasCheckbox(false);
        } else {
            setNuevasAreasMod(allAreasModIds);
            setIsValidAreasCheckbox(true);
        }
        setSelectAllMod(!selectAllMod);
    };


    //Validar que el checkbox no esté vacío y sea diferente al viejo checkbox
    const comparaListasAreas = (a, b) => {
        if (a.length !== b.length) return false;
        const sortedA = [...a].sort();
        const sortedB = [...b].sort();
        for (let i = 0; i < sortedA.length; i++) {
            if (sortedA[i] !== sortedB[i]) return false;
        }
        return true;
    };

    const validateNewAreas = (viejasAreasMod, nuevasAreasMod) => {
        return !comparaListasAreas(viejasAreasMod, nuevasAreasMod);
    };

    const isValidNewAreas = () => {
        return validateNewAreas(viejasAreasMod, nuevasAreasMod);
    };


    //Muestra el botón de guardar si los dos formularios están correctos
    const isValidCajaModForm = (isValidNewAreas() && isValidAreasCheckbox === true);

    //Resetea el datos para el modal editar
    const resetFormMod = () => {
        setCajaId();
        setViejasAreasMod([]);
        setNuevasAreasMod([]);
        setSelectAll(false);
        setSelectAllMod(false);
    };

    return (
        <>
            <div>
                {/* Componente del título */}
                <TextoTitulo tamaño={"h1"} texto="Cajas" color="black"></TextoTitulo>
                <div className="table-responsive" style={{ marginRight: 10, marginLeft: 10 }}>
                    <table className="table table-striped table-bordered border-black align-middle">
                        <thead className="table-dark">
                            {/* Encabezados de la tabla */}
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Caja</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Ciclo para obtener la información de la DB */}
                            {cajas ? (
                                cajas.map((caja) => (
                                    <tr key={caja.id}>
                                        <th scope="row" key={caja.id}>{caja.id}</th>
                                        <td key={caja.nombre_caja}>{caja.nombre_caja}</td>
                                        <td >
                                            <Popconfirm title='Borrar Elemento de Caja'
                                                description='¿Estás seguro de eliminar este elemento?'
                                                onConfirm={() => deleteCaja(caja.id)}
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
                                                data-bs-toggle="modal" data-bs-target="#modal-edit-nombrecaja"
                                                style={{
                                                    color: "white", backgroundColor: "#004DDE",
                                                    border: 0, margin: "3px 5px 3px 5px"
                                                }}
                                                onClick={() => {
                                                    resetModifyNombreForm();
                                                    getNombreCajaMod(caja.nombre_caja,
                                                        caja.id)
                                                }}>
                                                Editar
                                            </button>
                                            <button
                                                className="btn btn-info"
                                                data-bs-toggle="modal" data-bs-target="#modal-edit-caja"
                                                style={{
                                                    color: "white", backgroundColor: "#00B2FF",
                                                    border: 0, margin: "3px 5px 3px 5px"
                                                }}
                                                onClick={() => {
                                                    getAreaCajas();
                                                    getAreas();
                                                    getAreasPorCaja(caja.id)
                                                }}>
                                                Áreas
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
                    onClick={() => { resetFormCreate(); getAreas() }}>
                    Agregar Caja
                </button>
            </div>

            {/* ------- Modal de Agregar Caja --------- */}
            <div className="modal fade" id="modal-create-Caja" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            {/* Título del Modal */}
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Menú Crear Caja</h1>
                            {/* Botón X de cerrar */}
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                onClick={() => getCajas()}></button>
                        </div>

                        {/* Formulario para agregar Caja */}
                        <div className="modal-body ">
                            <form onSubmit={store}>
                                <Input
                                    value={nombre_Caja}
                                    type="text"
                                    label="Nombre de la Caja"
                                    variant="bordered"
                                    isInvalidCaja={isValidCaja}
                                    color={isValidCaja ? "success" : "danger"}
                                    errorMessage={!isValidCaja && "Escribe un nombre válido"}
                                    onChange={(e) => {
                                        setNombre_Caja(e.target.value);
                                    }}
                                    className="max-w-xs"
                                />

                                {/* Selección del área */}
                                <div style={{ marginTop: 10 }}>
                                    <h1 className="modal-title fs-5" id="staticBackdropLabel"
                                        style={{ marginBottom: 10 }}>Selecciona las Áreas a las que pertenece la Caja</h1>
                                    {/* Creación del checkbox */}
                                    {/* Ciclo por cada area se muestra un checkbox */}
                                    {/* Creación del checkbox de NextUI */}
                                    <Checkbox value={selectAll}
                                        onValueChange={handleSelectAllChange}
                                        isSelected={selectAll}>
                                        Selecciona todas las Áreas
                                    </Checkbox>
                                    <CheckboxGroup
                                        isRequired
                                        description="Es obligatorio seleccionar un área"
                                        isInvalid={!isValidCheckbox}
                                        orientation="horizontal"
                                        label="Marca las áreas que correspondan"
                                        value={areasSelected}
                                        onValueChange={handleValueChange}
                                    >
                                        {areas.map((area) => (
                                            <Checkbox key={area.id} value={area.id}>
                                                {area.nombre_area}</Checkbox>
                                        ))}
                                    </CheckboxGroup>
                                    <p className="text-default-500 text-small">Áreas Seleccionadas: {
                                        areas.filter(area => areasSelected.includes(area.id)).map(area => area.nombre_area).join(", ")
                                    }</p>
                                </div>

                                {/* Botón Guardar */}
                                <div className="d-flex justify-content-center align-items-center">
                                    {isValidCajaForm ? (
                                        // Si es true, el botón se muestra
                                        <Button variant="faded" className="bg-orange text-white"
                                            type="submit" data-bs-dismiss="modal" >
                                            Guardar
                                        </Button>
                                    ) : (
                                        // Si es false, no se muestra el botón
                                        <Button isDisabled variant="faded" className="bg-orange text-white"
                                            type="submit" data-bs-dismiss="modal" >
                                            Guardar
                                        </Button>
                                    )}
                                </div>

                            </form>
                        </div>
                        {/* Modal de Cerrar */}
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal"
                                onClick={() => getCajas()}>Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ----------- Modal de Editar Nombre de la Caja ---------- */}
            <div className="modal fade" id="modal-edit-nombrecaja" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            {/* Título del Modal */}
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Menú Editar Caja</h1>
                            {/* Botón X de cerrar */}
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                onClick={() => {
                                    getCajas()
                                    resetFormMod()
                                }}></button>
                        </div>

                        {/* Formulario para modificar el nombre */}
                        <div className="modal-body" >
                            <h1 className="modal-title fs-6" id="staticBackdropLabel"
                                style={{ marginBottom: 10 }}>Es obligatorio modificar el campo para guardar</h1>
                            <form onSubmit={modifyNombreCaja}>
                                <Input
                                    value={nombreCajaMod}
                                    type="text"
                                    label="Nombre de la Caja"
                                    placeholder="Ingrese el nombre nuevo  de la Caja"
                                    variant="bordered"
                                    isInvalid={!isValidNombreCajaMod}
                                    color={isValidNombreCajaMod ? "success" : "danger"}
                                    errorMessage={!isValidNombreCajaMod && "Escribe un nombre válido"}
                                    onChange={(e) => setNombreCajaMod(e.target.value)}
                                    className="max-w-xs"
                                />

                                {/* Botón Guardar */}
                                <div className="d-flex justify-content-center align-items-center">
                                    {isValidNombreCajaMod ? (
                                        // Si es true, el botón se muestra
                                        <Button variant="faded" className="bg-orange text-white"
                                            type="submit" data-bs-dismiss="modal" >
                                            Guardar
                                        </Button>
                                    ) : (
                                        // Si es false, no se muestra el botón
                                        <Button isDisabled variant="faded" className="bg-orange text-white"
                                            type="submit" data-bs-dismiss="modal" >
                                            Guardar
                                        </Button>
                                    )}
                                </div>
                            </form>
                        </div>
                        {/* Modal de Cerrar */}
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal"
                                onClick={() => {
                                    getCajas()
                                    resetModifyNombreForm()
                                }}>Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ----------- Modal de Editar Caja ---------- */}
            <div className="modal fade" id="modal-edit-caja" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            {/* Título del Modal */}
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Menú Editar Caja</h1>
                            {/* Botón X de cerrar */}
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                onClick={() => {
                                    getAreaCajas()
                                    resetFormMod()
                                }}></button>
                        </div>

                        {/* Formulario para modificar Áreas de la caja */}
                        <div className="modal-body" >
                            <h1 className="modal-title fs-6" id="staticBackdropLabel"
                                style={{ marginBottom: 10 }}>Es obligatorio modificar al menos un campo</h1>
                            <form onSubmit={modify}>
                                {/* Selección del área */}
                                <div style={{ marginTop: 10 }}>
                                    <h1 className="modal-title fs-5" id="staticBackdropLabel"
                                        style={{ marginBottom: 10 }}>Selecciona las Áreas a las que pertenece la Caja</h1>
                                    {/* Creación del checkbox */}
                                    {/* Ciclo por cada area se muestra un checkbox */}
                                    <Checkbox value={selectAllMod}
                                        onValueChange={handleModSelectAllChange}>
                                        Selecciona todas las Áreas
                                    </Checkbox>
                                    <CheckboxGroup
                                        isRequired
                                        description="Es obligatorio seleccionar un área"
                                        isInvalid={!isValidAreasCheckbox}
                                        orientation="horizontal"
                                        label="Marca las áreas que correspondan"
                                        value={nuevasAreasMod}
                                        onValueChange={handleModValueChange}
                                    >
                                        {areas.map((area) => (
                                            <Checkbox key={area.id} value={area.id}>
                                                {area.nombre_area}</Checkbox>
                                        ))}
                                    </CheckboxGroup>
                                    <p className="text-default-500 text-small">Áreas Seleccionadas: {
                                        areas.filter(area => nuevasAreasMod.includes(area.id)).map(area => area.nombre_area).join(", ")
                                    }</p>
                                </div>

                                {/* Botón Guardar */}
                                <div className="d-flex justify-content-center align-items-center">
                                    {isValidCajaModForm ? (
                                        // Si es true, el botón se muestra
                                        <Button variant="faded" className="bg-orange text-white"
                                            type="submit" data-bs-dismiss="modal" >
                                            Guardar
                                        </Button>
                                    ) : (
                                        // Si es false, no se muestra el botón
                                        <Button isDisabled variant="faded" className="bg-orange text-white"
                                            type="submit" data-bs-dismiss="modal" >
                                            Guardar
                                        </Button>
                                    )}
                                </div>
                            </form>
                        </div>
                        {/* Modal de Cerrar */}
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal"
                                onClick={() => {
                                    getAreaCajas()
                                    resetFormMod()
                                }}>Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
};

export default CompShowCajas;