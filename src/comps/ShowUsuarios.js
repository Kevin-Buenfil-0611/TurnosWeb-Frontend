import axios from "axios";
import React from "react";
import CryptoJS from "crypto-js";
import TextoTitulo from "./textoTitulos";
import { useState, useEffect } from "react";
import { Input, Button, CheckboxGroup, Checkbox } from "@nextui-org/react";
import { Popconfirm } from "antd";
import { EyeOutlined, EyeInvisibleOutlined, QuestionCircleOutlined } from "@ant-design/icons";

//*******Crear un botón para cambiar contraseña*******

//Dirección del backend para acceder a los métodos de la base de datos
const URI = 'http://localhost:8000/usuarios/';
const URIareas = 'http://localhost:8000/areas/';
const URIusuarios = 'http://localhost:8000/usuarios/';
const URIcajas = 'http://localhost:8000/cajas/';
const URIpermisos = 'http://localhost:8000/permisos/';
const URIpermisosusuarios = 'http://localhost:8000/permisousuario/';
const URIcajausuarios = 'http://localhost:8000/cajausuario/';
const URIdatospers = 'http://localhost:8000/datospers/';
const URIareausuarios = 'http://localhost:8000/areausuario/';

var InfoAreaUsuario = []
var InfoCajaUsuario = []
var InfoPermisoUsuario = []

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

    //Procedimiento para mostrar todas las Áreas
    const [areas, setAreas] = useState([])
    useEffect(() => {
        getAreas()
    }, [])

    const getAreas = async () => {
        const res = await axios.get(URIareas)
        setAreas(res.data)
    }

    //Procedimiento para mostrar todas los Permisos
    const [permisos, setPermisos] = useState([])
    useEffect(() => {
        getPermisos()
    }, [])

    const getPermisos = async () => {
        const res = await axios.get(URIpermisos)
        setPermisos(res.data)
    }

    //Procedimiento para mostrar todas los datos personales
    const [datospers, setDatospers] = useState([])
    useEffect(() => {
        getDatospers()
    }, [])

    const getDatospers = async () => {
        const res = await axios.get(URIdatospers)
        setDatospers(res.data)
    }

    //Procedimiento para mostrar todas las cajas
    const [cajas, setCajas] = useState([])
    useEffect(() => {
        getCajas()
    }, [])

    const getCajas = async () => {
        const res = await axios.get(URIcajas)
        setCajas(res.data)
    }

    //Procedimiento para eliminar un Usuario
    const deleteUsuario = async (id) => {
        const usuarioDelete = localStorage.getItem("usuario");
        await axios.put(`${URI}${id}`, {
            estatus: false, update_by: usuarioDelete
        });
        getUsuarios();
    }


    // *************** Crear Usuario ****************
    //Procedimiento para crear un Usuario
    const [nombre_usuario, setNombre_usuario] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [contraseñaDos, setContraseñaDos] = useState('');
    const [nombre_personal, setNombrePersonal] = useState('');
    const [primer_apellido, setPrimerApellido] = useState('');
    const [segundo_apellido, setSegundoApellido] = useState('');
    const [telefono, setTelefono] = useState('');


    const store = async (e) => {
        const usuarioCreate = localStorage.getItem("usuario");
        e.preventDefault();
        //Encriptar la contraseña
        const contraSHA256 = CryptoJS.SHA256(contraseña).toString(CryptoJS.enc.Hex)
        await axios.post(URI, {
            nombre_usuario: nombre_usuario, contraseña: contraSHA256,
            estatus: true, nombre_personal: nombre_personal,
            primer_apellido: primer_apellido, segundo_apellido: segundo_apellido,
            telefono: telefono, create_by: usuarioCreate
        });
        getUsuarios();
        getDatospers();
    }

    //Resetea el valor del formulario Crear Usuarios
    const resetCreateForm = () => {
        setNombre_usuario('');
        setContraseña('');
        setContraseñaDos('');
        setNombrePersonal('');
        setPrimerApellido('');
        setSegundoApellido('');
        setTelefono('');
    };

    // Validar la información del input de Usuario
    const validateUsuario = (nombre_usuario) => nombre_usuario.trim() !== '';
    const isValidUser = React.useMemo(() => {
        return validateUsuario(nombre_usuario);
    }, [nombre_usuario]);

    //Validar la información del input de Contraseña y repetir la contraseña
    //  Contraseña
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const validateContraseña = (contraseña) => contraseña.trim() !== '';

    const isValidPassword = React.useMemo(() => {
        return validateContraseña(contraseña);
    }, [contraseña]);

    //  Volver a escribir la contraseña
    const [isVisibleTwo, setIsVisibleTwo] = useState(false);
    const toggleVisibilityTwo = () => setIsVisibleTwo(!isVisibleTwo);
    const validateContraseñaDos = (contraseña, contraseñaDos) => (contraseñaDos.trim() === contraseña.trim() && contraseñaDos !== '');

    const isValidPasswordDos = React.useMemo(() => {
        return validateContraseñaDos(contraseña, contraseñaDos);
    }, [contraseña, contraseñaDos]);

    // Validar la información del input de Nombre personal
    const validateNombrePersonal = (nombre_personal) => nombre_personal.trim() !== '';
    const isValidNombrePersonal = React.useMemo(() => {
        return validateNombrePersonal(nombre_personal);
    }, [nombre_personal]);

    // Validar la información del input de Primer Apellido
    const validatePrimerApellido = (primer_apellido) => primer_apellido.trim() !== '';
    const isValidPrimerApellido = React.useMemo(() => {
        return validatePrimerApellido(primer_apellido);
    }, [primer_apellido]);

    // Validar la información del input de Segundo Apellido
    const validateSegundoApellido = (segundo_apellido) => segundo_apellido.trim() !== '';
    const isValidSegundoApellido = React.useMemo(() => {
        return validateSegundoApellido(segundo_apellido);
    }, [segundo_apellido]);

    // Validar la información del input de Telefonoo
    const validateTelefono = (telefono) => {
        const regex = /^[0-9]{10}$/;
        return telefono.trim() !== '' && regex.test(telefono);
    };
    const isValidTelefono = React.useMemo(() => {
        return validateTelefono(telefono);
    }, [telefono]);

    //Validar que el Input de Usuario, contraseña y el de las Áreas sean true y mostrar el botón guardar
    const isValidForm = isValidUser === true && isValidPassword === true &&
        isValidPasswordDos === true && isValidNombrePersonal === true
        && isValidPrimerApellido === true && isValidSegundoApellido === true
        && isValidTelefono === true;


    // ***************** Agregar Permisos de Usuario *******************

    //Procedimiento para mostrar todas los registros de la tabla PermisosUsuarios
    //const [permisousuarios, setPermisoUsuarios] = useState([])
    useEffect(() => {
        getPermisoUsuarios()
    }, [])

    const getPermisoUsuarios = async () => {
        const res = await axios.get(URIpermisosusuarios)
        //setPermisoUsuarios(res.data)
        InfoPermisoUsuario = res.data
    }
    //Procedimiento para crear/modificar los permisos por usuario
    const modify = async (e) => {
        const usuarioModify = localStorage.getItem("usuario");
        e.preventDefault();
        const InfoNuevaPermisos = await axios.put(`${URIpermisosusuarios}${idUsuarioMod}`, {
            permisosMod: nuevosPermisos, usuarios_id: idUsuarioMod,
            update_by: usuarioModify
        });
        InfoPermisoUsuario = InfoNuevaPermisos.data;
        resetPermisosForm();
    }
    //Obtiene las permisos que tiene el usuario
    const [permisosPorUsuario, setPermisosPorUsuario] = useState([]);
    const [nuevosPermisos, setNuevosPermisos] = useState([]);
    const [idUsuarioMod, setIdUsuarioMod] = useState();


    const getPermisosPorUsuario = (usuario_id) => {
        try {
            let ListaPermisosPerUsuario = InfoPermisoUsuario.filter(
                permisousuario => permisousuario.usuario_id === usuario_id).map(
                    permisousuario => permisousuario.permiso_id);

            setNuevosPermisos(ListaPermisosPerUsuario);
            setPermisosPorUsuario(ListaPermisosPerUsuario);
            setValidPermisosCheckbox(ListaPermisosPerUsuario.length > 0);
            setIdUsuarioMod(usuario_id);
        } catch (error) {
            console.error('Error al obtener datos del Usuario:', error);
        }
    };

    //Permite detectar si el checkbox está marcado o no
    const [isValidPermisosCheckbox, setValidPermisosCheckbox] = useState(false);
    const [selectAllPermisos, setselectAllPermisos] = useState(false);

    const handleValueChange = (value) => {

        setNuevosPermisos(value);
        setValidPermisosCheckbox(value.length > 0);
    };

    const handleSelectAllChange = () => {
        const allPermisosIds = permisos.map((permiso) => permiso.id);
        if (selectAllPermisos) {
            setNuevosPermisos([]);
            setValidPermisosCheckbox(false);
        } else {
            setNuevosPermisos(allPermisosIds);
            setValidPermisosCheckbox(true);
        }
        setselectAllPermisos(!selectAllPermisos);
    };

    // Validar que los nuevos permisos sean diferentes que los viejos permisos

    const comparaListasPermisos = (a, b) => {
        if (a.length !== b.length) return false;
        const sortedA = [...a].sort();
        const sortedB = [...b].sort();
        for (let i = 0; i < sortedA.length; i++) {
            if (sortedA[i] !== sortedB[i]) return false;
        }
        return true;
    };

    const validateNewPermisos = (permisosPorUsuario, nuevosPermisos) => {
        return !comparaListasPermisos(permisosPorUsuario, nuevosPermisos);
    };

    const isValidNewPermisos = () => {
        return validateNewPermisos(permisosPorUsuario, nuevosPermisos);
    };

    const isValidPermisosForm = isValidNewPermisos() === true && isValidPermisosCheckbox === true;

    const resetPermisosForm = () => {
        setPermisosPorUsuario([]);
        setNuevosPermisos([]);
        setselectAllPermisos(false);
    };


    // ***************** Agregar Cajas de Usuario *******************

    //Procedimiento para mostrar todas los registros de la tabla PermisosUsuarios
    //const [cajausuarios, setCajaUsuarios] = useState([])
    useEffect(() => {
        getCajaUsuarios()
    }, [])

    const getCajaUsuarios = async () => {
        const res = await axios.get(URIcajausuarios)
        //setCajaUsuarios(res.data)
        InfoCajaUsuario = res.data
    }
    //Procedimiento para crear/modificar las cajas por usuario
    const modifyCajaUsuario = async (e) => {
        const usuarioModify = localStorage.getItem("usuario");
        e.preventDefault();
        const InfoNuevasCajas = await axios.put(`${URIcajausuarios}${idUsuarioModCajas}`, {
            cajaMod: nuevasCajas, usuario_id: idUsuarioModCajas,
            update_by: usuarioModify
        });
        InfoCajaUsuario = InfoNuevasCajas.data;
        getCajaUsuarios();
        resetCajasForm();
    }
    //Obtiene las cajas que tiene el usuario
    const [cajasPorUsuario, setCajasPorUsuario] = useState([]);
    const [nuevasCajas, setNuevasCajas] = useState([]);
    const [idUsuarioModCajas, setIdUsuarioModCajas] = useState();

    const getCajasPorUsuario = (usuario_id) => {
        try {
            let ListaCajasPerUsuario = InfoCajaUsuario.filter(
                cajausuario => cajausuario.usuario_id === usuario_id).map(
                    cajausuario => cajausuario.caja_id);
            setNuevasCajas(ListaCajasPerUsuario);
            setCajasPorUsuario(ListaCajasPerUsuario);
            setValidCajasCheckbox(ListaCajasPerUsuario.length > 0);
            setIdUsuarioModCajas(usuario_id);
        } catch (error) {
            console.error('Error al obtener datos del Usuario:', error);
        }
    };

    //Permite detectar si el checkbox está marcado o no
    const [isValidCajasCheckbox, setValidCajasCheckbox] = useState(false);
    const [selectAllCajas, setselectAllCajas] = useState(false);

    const handleValueChangeCajas = (value) => {
        setNuevasCajas(value);
        setValidCajasCheckbox(value.length > 0);
    };

    const handleSelectAllChangeCajas = () => {
        const allCajasIds = cajas.map((caja) => caja.id);
        if (selectAllCajas) {
            setNuevasCajas([]);
            setValidCajasCheckbox(false);
        } else {
            setNuevasCajas(allCajasIds);
            setValidCajasCheckbox(true);
        }
        setselectAllCajas(!selectAllCajas);
    };

    // Validar que los nuevos permisos sean diferentes que los viejos permisos

    const comparaListasCajas = (a, b) => {
        if (a.length !== b.length) return false;
        const sortedA = [...a].sort();
        const sortedB = [...b].sort();
        for (let i = 0; i < sortedA.length; i++) {
            if (sortedA[i] !== sortedB[i]) return false;
        }
        return true;
    };

    const validateNewCajas = (cajasPorUsuario, nuevasCajas) => {
        return !comparaListasCajas(cajasPorUsuario, nuevasCajas);
    };

    const isValidNewCajas = () => {
        return validateNewCajas(cajasPorUsuario, nuevasCajas);
    };

    const isValidCajasForm = isValidNewCajas() === true && isValidCajasCheckbox === true;

    const resetCajasForm = () => {
        setCajasPorUsuario([]);
        setNuevasCajas([]);
        setselectAllCajas(false);
    };

    // ***************** Agregar Areas del Usuario *******************

    //Procedimiento para mostrar todas los registros de la tabla PermisosUsuarios
    //const [areausuarios, setAreaUsuarios] = useState([])
    useEffect(() => {
        getAreaUsuarios()
    }, [])

    const getAreaUsuarios = async () => {
        const res = await axios.get(URIareausuarios)
        //setAreaUsuarios(res.data)
        InfoAreaUsuario = res.data
    }
    //Procedimiento para crear/modificar las cajas por usuario
    const modifyAreaUsuario = async (e) => {
        const usuarioModify = localStorage.getItem("usuario");
        e.preventDefault();
        const InfoNuevasAreas = await axios.put(`${URIareausuarios}${idUsuarioModAreas}`, {
            areasMod: nuevasAreas, usuario_id: idUsuarioModAreas,
            update_by: usuarioModify
        });
        InfoAreaUsuario = InfoNuevasAreas.data;
        resetAreasForm();
    }
    //Obtiene las cajas que tiene el usuario
    const [areasPorUsuario, setAreasPorUsuario] = useState([]);
    const [nuevasAreas, setNuevasAreas] = useState([]);
    const [idUsuarioModAreas, setIdUsuarioModAreas] = useState();

    const getAreasPorUsuario = (usuario_id) => {
        try {
            let ListaAreasPerUsuario = InfoAreaUsuario.filter(
                areausuario => areausuario.usuario_id === usuario_id).map(
                    areausuario => areausuario.area_id);
            setNuevasAreas(ListaAreasPerUsuario);
            setAreasPorUsuario(ListaAreasPerUsuario);
            setValidAreasCheckbox(ListaAreasPerUsuario.length > 0);
            setIdUsuarioModAreas(usuario_id);
        } catch (error) {
            console.error('Error al obtener datos del Usuario:', error);
        }
    };

    //Permite detectar si el checkbox está marcado o no
    const [isValidAreasCheckbox, setValidAreasCheckbox] = useState(false);
    const [selectAllAreas, setselectAllAreas] = useState(false);

    const handleValueChangeAreas = (value) => {
        setNuevasAreas(value);
        setValidAreasCheckbox(value.length > 0);
    };

    const handleSelectAllChangeAreas = () => {
        const allAreasIds = areas.map((area) => area.id);
        if (selectAllAreas) {
            setNuevasAreas([]);
            setValidAreasCheckbox(false);
        } else {
            setNuevasAreas(allAreasIds);
            setValidAreasCheckbox(true);
        }
        setselectAllAreas(!selectAllAreas);
    };

    // Validar que los nuevos permisos sean diferentes que los viejos permisos

    const comparaListasAreas = (a, b) => {
        if (a.length !== b.length) return false;
        const sortedA = [...a].sort();
        const sortedB = [...b].sort();
        for (let i = 0; i < sortedA.length; i++) {
            if (sortedA[i] !== sortedB[i]) return false;
        }
        return true;
    };

    const validateNewAreas = (areasPorUsuario, nuevasAreas) => {
        return !comparaListasAreas(areasPorUsuario, nuevasAreas);
    };

    const isValidNewAreas = () => {
        return validateNewAreas(areasPorUsuario, nuevasAreas);
    };

    const isValidAreasForm = isValidNewAreas() === true && isValidAreasCheckbox === true;

    const resetAreasForm = () => {
        setAreasPorUsuario([]);
        setNuevasAreas([]);
        setselectAllAreas(false);
    };

    // ************** Modal editar información del Usuario *********************

    //Procedimiento para modificar los datos personales del usuario
    const [idUsuarioModDatos, setIdUsuarioModDatos] = useState('');
    const [nombre_personalviejo, setNombrePersonalViejo] = useState('');
    const [nombre_personalnuevo, setNombrePersonalNuevo] = useState('');
    const [primer_apellidoviejo, setPrimerApellidoViejo] = useState('');
    const [primer_apellidonuevo, setPrimerApellidoNuevo] = useState('');
    const [segundo_apellidoviejo, setSegundoApellidoViejo] = useState('');
    const [segundo_apellidonuevo, setSegundoApellidoNuevo] = useState('');
    const [telefonoviejo, setTelefonoViejo] = useState('');
    const [telefononuevo, setTelefonoNuevo] = useState('');


    const getDatosPersPorUsuario = (usuario_id, nombres, primer_apellido, segundo_apellido, telefono) => {
        //Si está bien la info recibida, setear todos los valores a las const de arriba creadas
        setIdUsuarioModDatos(usuario_id);
        setNombrePersonalNuevo(nombres);
        setNombrePersonalViejo(nombres);
        setPrimerApellidoNuevo(primer_apellido);
        setPrimerApellidoViejo(primer_apellido);
        setSegundoApellidoNuevo(segundo_apellido);
        setSegundoApellidoViejo(segundo_apellido);
        setTelefonoNuevo(telefono);
        setTelefonoViejo(telefono);
    }

    const modifydatospers = async (e) => {
        const usuarioModify = localStorage.getItem("usuario");
        e.preventDefault();
        const InfoNuevosDatos = await axios.put(`${URIdatospers}${idUsuarioModDatos}`, {
            id: idUsuarioModDatos,
            nombres: nombre_personalnuevo,
            primer_apellido: primer_apellidonuevo,
            segundo_apellido: segundo_apellidonuevo,
            telefono: telefononuevo,
            update_by: usuarioModify
        });
        getDatospers(InfoNuevosDatos.data);
        getUsuarios();
        resetModifyForm();
    }

    //Validar los datos del formulario de modificar datos personales

    // Validar la información del input de Nombre personal
    const validateNombreMod = (nombre_personalnuevo, nombre_personalviejo) => nombre_personalnuevo.trim() !== '' &&
        nombre_personalnuevo !== nombre_personalviejo;

    const isValidNombreMod = React.useMemo(() => {
        return validateNombreMod(nombre_personalnuevo, nombre_personalviejo);
    }, [nombre_personalnuevo, nombre_personalviejo]);

    // Validar la información del input de Primer Apellido
    const validatePrimerApellidoMod = (primer_apellidonuevo, primer_apellidoviejo) => primer_apellidonuevo.trim() !== '' &&
        primer_apellidonuevo !== primer_apellidoviejo;

    const isValidPrimerApellidoMod = React.useMemo(() => {
        return validatePrimerApellidoMod(primer_apellidonuevo, primer_apellidoviejo);
    }, [primer_apellidonuevo, primer_apellidoviejo]);

    // Validar la información del input de Segundo Apellido
    const validateSegundoApellidoMod = (segundo_apellidonuevo, segundo_apellidoviejo) => segundo_apellidonuevo.trim() !== '' &&
        segundo_apellidonuevo !== segundo_apellidoviejo;

    const isValidSegundoApellidoMod = React.useMemo(() => {
        return validateSegundoApellidoMod(segundo_apellidonuevo, segundo_apellidoviejo);
    }, [segundo_apellidonuevo, segundo_apellidoviejo]);

    // Validar la información del input de Telefono
    const validateTelefonoMod = (telefononuevo, telefonoviejo) => {
        const regex = /^[0-9]{10}$/;
        return telefononuevo.trim() !== '' && telefononuevo !== telefonoviejo && regex.test(telefononuevo);
    };

    const isValidTelefonoMod = React.useMemo(() => {
        return validateTelefonoMod(telefononuevo, telefonoviejo);
    }, [telefononuevo, telefonoviejo]);

    const isValidModifyForm = isValidNombreMod === true || isValidPrimerApellidoMod === true ||
        isValidSegundoApellidoMod === true || isValidTelefonoMod === true;

    const resetModifyForm = () => {
        setIdUsuarioModDatos('');
        setNombrePersonalNuevo('');
        setNombrePersonalViejo('');
        setPrimerApellidoNuevo('');
        setPrimerApellidoViejo('');
        setSegundoApellidoNuevo('');
        setSegundoApellidoViejo('');
        setTelefonoNuevo('');
        setTelefonoViejo('');
    }

    // ************** Modal contrseña del Usuario *********************
    const [contraseñaUser, setContraseñaUser] = useState('');
    const [usuarioContra_ID, setUsuarioContra_ID] = useState('')

    const getContraseña = async (usuario_id) => {
        setUsuarioContra_ID(usuario_id);
    }
    //Validar la información del input de Contraseña y repetir la contraseña
    const [isVisiblePasswordMod, setIsVisiblePasswordMod] = useState(false);
    const toggleVisibilityPasswordMod = () => setIsVisiblePasswordMod(!isVisiblePasswordMod);
    const validateContraseñaMod = (contraseñaUser) => contraseñaUser.trim() !== '';

    const isValidPasswordMod = React.useMemo(() => {
        return validateContraseñaMod(contraseñaUser);
    }, [contraseñaUser]);

    const modifycontraseña = async (e) => {
        e.preventDefault();
        const contraNuevaSHA256 = CryptoJS.SHA256(contraseñaUser).toString(CryptoJS.enc.Hex)
        const usuarioUpdate = localStorage.getItem("usuario");
        await axios.put(`${URIusuarios}${usuarioContra_ID}/getp`, {
            id: usuarioContra_ID,
            contraseña: contraNuevaSHA256,
            update_by: usuarioUpdate
        });
    }

    const resetPasswordForm = () => {
        setContraseñaUser('');
        setUsuarioContra_ID('');
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
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Ciclo para obtener la información de la DB */}
                        {usuarios ? (
                            usuarios.map((usuario) => (
                                <tr key={usuario.id}>
                                    <th scope="row">{usuario.id}</th>
                                    <td>{usuario.nombre_usuario}</td>
                                    <td >
                                        <Popconfirm title='Borrar Usuario'
                                            description="¿Estás seguro de eliminar este usuario? Afectará al sistema"
                                            onConfirm={() => deleteUsuario(usuario.id)}
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
                                            data-bs-toggle="modal" data-bs-target="#modal-permisos-users"
                                            style={{
                                                color: "white", backgroundColor: "#004DDE",
                                                border: 0, margin: "3px 5px 3px 5px"
                                            }}
                                            onClick={async () => {
                                                await getPermisoUsuarios();
                                                resetPermisosForm();
                                                getPermisos();
                                                getPermisosPorUsuario(usuario.id);
                                            }}>
                                            Permisos
                                        </button>
                                        <button
                                            className="btn btn-info"
                                            data-bs-toggle="modal" data-bs-target="#modal-datos-users"
                                            style={{
                                                color: "white", backgroundColor: "#00E91C",
                                                border: 0, margin: "3px 5px 3px 5px"
                                            }}
                                            onClick={() => {
                                                resetModifyForm();
                                                getDatosPersPorUsuario(usuario.id, usuario.nombres,
                                                    usuario.primer_apellido, usuario.segundo_apellido,
                                                    usuario.telefono);
                                            }}>
                                            Datos Personales
                                        </button>
                                        <button
                                            className="btn btn-info"
                                            data-bs-toggle="modal" data-bs-target="#modal-cajas-users"
                                            style={{
                                                color: "white", backgroundColor: "#FA770F",
                                                border: 0, margin: "3px 5px 3px 5px"
                                            }}
                                            onClick={async () => {
                                                await getCajaUsuarios();
                                                resetCajasForm();
                                                getCajas();
                                                getCajasPorUsuario(usuario.id);
                                            }}>
                                            Cajas
                                        </button>
                                        <button
                                            className="btn btn-info"
                                            data-bs-toggle="modal" data-bs-target="#modal-areas-users"
                                            style={{
                                                color: "white", backgroundColor: "#00B2FF",
                                                border: 0, margin: "3px 5px 3px 5px"
                                            }}
                                            onClick={async () => {
                                                await getAreaUsuarios();
                                                resetAreasForm();
                                                getAreas();
                                                getAreasPorUsuario(usuario.id);
                                            }}>
                                            Áreas
                                        </button>
                                        <button
                                            className="btn btn-info"
                                            data-bs-toggle="modal" data-bs-target="#modal-contraseña-user"
                                            style={{
                                                color: "white", backgroundColor: "#6F4E37",
                                                border: 0, margin: "3px 5px 3px 5px"
                                            }}
                                            onClick={() => {
                                                resetPasswordForm();
                                                getContraseña(usuario.id);
                                            }}>
                                            Contraseña
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

            {/* Botón de Agregar Usuario */}
            <div className="d-flex justify-content-center">
                <button
                    className="btn btn-primary"
                    data-bs-toggle="modal" data-bs-target="#modal-create-usuario"
                    style={{
                        marginTop: 10, marginBottom: 10,
                        backgroundColor: "#FA770F", border: 0
                    }}
                    onClick={() => {
                        resetCreateForm();
                        getAreas();
                    }}
                >
                    Agregar Usuario
                </button>
            </div>

            {/* ------- Modal de Agregar Usuario -------*/}
            <div className="modal fade" id="modal-create-usuario" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            {/* Título del Modal */}
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Menú Crear Usuario</h1>
                            {/* Botón X de cerrar */}
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                onClick={() => {
                                    resetCreateForm();
                                    getUsuarios();
                                    getDatospers();
                                }}></button>
                        </div>
                        {/* Formulario para agregar Área */}
                        <div className="modal-body">
                            {/* Input Nombre del Usuario */}
                            <form onSubmit={store}>
                                <Input
                                    isClearable
                                    value={nombre_usuario}
                                    type="text"
                                    label="Nombre del Usuario"
                                    variant="bordered"
                                    isInvalidUser={isValidUser}
                                    color={isValidUser ? "success" : "danger"}
                                    errorMessage={!isValidUser && "Nombre de usuario inválido"}
                                    onChange={(e) => setNombre_usuario(e.target.value)}
                                    className="max-w-xs"
                                />
                                <div style={{ marginTop: 15 }}></div>
                                {/* Input Contraseña */}
                                <Input
                                    label="Contraseña"
                                    variant="bordered"
                                    placeholder="Ingrese su contraseña"
                                    value={contraseña}
                                    isInvalidPassword={isValidPassword}
                                    color={isValidPassword ? "success" : "danger"}
                                    errorMessage={!isValidPassword && "Contraseña inválida"}
                                    onChange={(e) => setContraseña(e.target.value)}
                                    endContent={
                                        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                            {isVisible ? (
                                                <EyeOutlined className="text-2xl text-default-400 pointer-events-none" />
                                            ) : (
                                                <EyeInvisibleOutlined className="text-2xl text-default-400 pointer-events-none" />
                                            )}
                                        </button>
                                    }
                                    type={isVisible ? "text" : "password"}
                                    className="max-w-xs"
                                />
                                <div style={{ marginTop: 15 }}></div>
                                <Input
                                    label="Repita la contraseña"
                                    variant="bordered"
                                    placeholder="Ingrese nuevamente su contraseña"
                                    value={contraseñaDos}
                                    isValidPassword={isValidPasswordDos}
                                    color={isValidPasswordDos ? "success" : "danger"}
                                    errorMessage={!isValidPasswordDos && "Contraseña inválida"}
                                    onChange={(e) => setContraseñaDos(e.target.value)}
                                    endContent={
                                        <button className="focus:outline-none" type="button" onClick={toggleVisibilityTwo}>
                                            {isVisibleTwo ? (
                                                <EyeOutlined className="text-2xl text-default-400 pointer-events-none" />
                                            ) : (
                                                <EyeInvisibleOutlined className="text-2xl text-default-400 pointer-events-none" />
                                            )}
                                        </button>
                                    }
                                    type={isVisibleTwo ? "text" : "password"}
                                    className="max-w-xs"
                                />

                                <div className="modal-header" style={{ marginBottom: 10 }}>
                                    {/* Título 2 del Modal*/}
                                    <h1 className="modal-title fs-5" id="staticBackdropLabel">Menú Datos Personales del Usuario</h1>
                                </div>

                                <Input
                                    isClearable
                                    value={nombre_personal}
                                    type="text"
                                    label="Nombre(s)"
                                    placeholder="Ingrese su nombre"
                                    variant="bordered"
                                    isInvalidUser={isValidNombrePersonal}
                                    color={isValidNombrePersonal ? "success" : "danger"}
                                    errorMessage={!isValidNombrePersonal && "Información inválida"}
                                    onChange={(e) => setNombrePersonal(e.target.value)}
                                    className="max-w-xs"
                                />
                                <div style={{ marginTop: 15 }}></div>
                                {/* Input Primer Apellido */}
                                <Input
                                    label="Primer Apellido"
                                    variant="bordered"
                                    placeholder="Ingrese su primer apellido"
                                    value={primer_apellido}
                                    isInvalidPassword={isValidPrimerApellido}
                                    color={isValidPrimerApellido ? "success" : "danger"}
                                    errorMessage={!isValidPrimerApellido && "Información inválida"}
                                    onChange={(e) => setPrimerApellido(e.target.value)}
                                    type={"text"}
                                    className="max-w-xs"
                                />
                                <div style={{ marginTop: 15 }}></div>
                                {/* Input Segundo Apellido */}
                                <Input
                                    label="Segundo Apellido"
                                    variant="bordered"
                                    placeholder="Ingrese su segundo apellido"
                                    value={segundo_apellido}
                                    isValidPassword={isValidSegundoApellido}
                                    color={isValidSegundoApellido ? "success" : "danger"}
                                    errorMessage={!isValidSegundoApellido && "Información inválida"}
                                    onChange={(e) => setSegundoApellido(e.target.value)}
                                    type={"text"}
                                    className="max-w-xs"
                                />
                                <div style={{ marginTop: 15 }}></div>
                                <Input
                                    label="Número de Teléfono (10 dígitos)"
                                    variant="bordered"
                                    placeholder="Ingrese su número de teléfono"
                                    value={telefono}
                                    isValidPassword={isValidTelefono}
                                    color={isValidTelefono ? "success" : "danger"}
                                    errorMessage={!isValidTelefono && "Información inválido"}
                                    onChange={(e) => setTelefono(e.target.value)}
                                    type={"text"}
                                    className="max-w-xs"
                                />

                                {/* Botón Guardar */}
                                <div className="d-flex justify-content-center" style={{ marginTop: 10 }}>
                                    {isValidForm ? (
                                        // Si isValidForm es true, el botón se muestra
                                        <Button variant="faded" className="bg-orange text-white"
                                            type="submit" data-bs-dismiss="modal" >
                                            Guardar
                                        </Button>
                                    ) : (
                                        // Si isValidForm es false, no se muestra el botón
                                        <>
                                            <Button isDisabled variant="faded" className="bg-orange text-white"
                                                type="submit" data-bs-dismiss="modal" >
                                                Guardar
                                            </Button>
                                        </>

                                    )}
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            {/* Modal de Cerrar */}
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal"
                                onClick={() => {
                                    getUsuarios(); resetCreateForm();
                                    getDatospers();
                                }}>Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ------- Modal de Modificar Permisos Usuarios -------*/}
            <div className="modal fade" id="modal-permisos-users" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            {/* Título del Modal */}
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Menú Permisos de Usuario</h1>
                            {/* Botón X de cerrar */}
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                onClick={() => { resetPermisosForm() }}
                            ></button>
                        </div>
                        {/* Formulario para agregar Permisos */}
                        <div className="modal-body">
                            <form onSubmit={modify}>
                                <div>
                                    <h1 className="modal-title fs-5" id="staticBackdropLabel"
                                        style={{ marginBottom: 10 }}>Selecciona los permisos del usuario</h1>
                                    {/* Creación del checkbox */}
                                    {/* Ciclo por cada permiso se muestra un checkbox */}
                                    {/* Creación del checkbox de NextUI */}
                                    <Checkbox value={selectAllPermisos}
                                        onValueChange={handleSelectAllChange}
                                        isSelected={selectAllPermisos}>
                                        Selecciona todos los Permisos
                                    </Checkbox>
                                    <CheckboxGroup
                                        isRequired
                                        description="Es obligatorio seleccionar un permiso"
                                        isInvalid={!isValidPermisosCheckbox}
                                        orientation="horizontal"
                                        label="Marca los permisos que le correspondan"
                                        value={nuevosPermisos}
                                        onValueChange={handleValueChange}
                                    >
                                        {permisos.map((permiso) => (
                                            <Checkbox key={permiso.id} value={permiso.id}>
                                                {permiso.nombre}</Checkbox>
                                        ))}
                                    </CheckboxGroup>
                                </div>

                                {/* Botón Guardar  */}
                                <div className="d-flex justify-content-center">
                                    {isValidPermisosForm ? (
                                        // Si isValidForm es true, el botón se muestra
                                        <Button variant="faded" className="bg-orange text-white"
                                            type="submit" data-bs-dismiss="modal" >
                                            Guardar
                                        </Button>
                                    ) : (
                                        // Si isValidForm es false, no se muestra el botón
                                        <>
                                            <Button isDisabled variant="faded" className="bg-orange text-white"
                                                type="submit" data-bs-dismiss="modal" >
                                                Guardar
                                            </Button>
                                        </>

                                    )}
                                </div>
                            </form>

                        </div>
                        <div className="modal-footer">
                            {/* Modal de Cerrar */}
                            <p>*Se da prioridad a las Áreas de la Caja en caso de otorgar los 2 permisos de "Áreas de la Caja" y "Áreas del Usuario" </p>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal"
                                onClick={() => { resetPermisosForm() }}>Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ------- Modal de Cajas por Usuario -------*/}
            <div className="modal fade" id="modal-cajas-users" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            {/* Título del Modal */}
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Menú Cajas de Usuario</h1>
                            {/* Botón X de cerrar */}
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                onClick={() => { resetCajasForm() }}
                            ></button>
                        </div>
                        {/* Formulario para agregar las Cajas */}
                        <div className="modal-body">
                            <form onSubmit={modifyCajaUsuario}>
                                <div>
                                    <h1 className="modal-title fs-5" id="staticBackdropLabel"
                                        style={{ marginBottom: 10 }}>Selecciona las cajas del usuario</h1>
                                    {/* Creación del checkbox de NextUI */}
                                    <Checkbox value={selectAllCajas}
                                        onValueChange={handleSelectAllChangeCajas}
                                        isSelected={selectAllCajas}>
                                        Selecciona todas las Cajas
                                    </Checkbox>
                                    <CheckboxGroup
                                        isRequired
                                        description="Es obligatorio seleccionar una caja"
                                        isInvalid={!isValidCajasCheckbox}
                                        orientation="horizontal"
                                        label="Marca las cajas que le correspondan"
                                        value={nuevasCajas}
                                        onValueChange={handleValueChangeCajas}
                                    >
                                        {cajas.map((caja) => (
                                            <Checkbox key={caja.id} value={caja.id}>
                                                {caja.nombre_caja}</Checkbox>
                                        ))}
                                    </CheckboxGroup>
                                </div>

                                {/* Botón Guardar  */}
                                <div className="d-flex justify-content-center">
                                    {isValidCajasForm ? (
                                        // Si isValidForm es true, el botón se muestra
                                        <Button variant="faded" className="bg-orange text-white"
                                            type="submit" data-bs-dismiss="modal" >
                                            Guardar
                                        </Button>
                                    ) : (
                                        // Si isValidForm es false, no se muestra el botón
                                        <>
                                            <Button isDisabled variant="faded" className="bg-orange text-white"
                                                type="submit" data-bs-dismiss="modal" >
                                                Guardar
                                            </Button>
                                        </>

                                    )}
                                </div>
                            </form>

                        </div>
                        <div className="modal-footer">
                            {/* Modal de Cerrar */}
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal"
                                onClick={() => { resetCajasForm() }}>Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ------- Modal de Areas por Usuario -------*/}
            <div className="modal fade" id="modal-areas-users" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            {/* Título del Modal */}
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Menú Áreas de Usuario</h1>
                            {/* Botón X de cerrar */}
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                onClick={() => { resetAreasForm() }}
                            ></button>
                        </div>
                        {/* Formulario para agregar las Cajas */}
                        <div className="modal-body">
                            <form onSubmit={modifyAreaUsuario}>
                                <div>
                                    <h1 className="modal-title fs-5" id="staticBackdropLabel"
                                        style={{ marginBottom: 10 }}>Selecciona las áreas del usuario</h1>
                                    {/* Creación del checkbox de NextUI */}
                                    <Checkbox value={selectAllAreas}
                                        onValueChange={handleSelectAllChangeAreas}
                                        isSelected={selectAllAreas}>
                                        Selecciona todas las Áreas
                                    </Checkbox>
                                    <CheckboxGroup
                                        isRequired
                                        description="Es obligatorio seleccionar una caja"
                                        isInvalid={!isValidAreasCheckbox}
                                        orientation="horizontal"
                                        label="Marca las cajas que le correspondan"
                                        value={nuevasAreas}
                                        onValueChange={handleValueChangeAreas}
                                    >
                                        {areas.map((area) => (
                                            <Checkbox key={area.id} value={area.id}>
                                                {area.nombre_area}</Checkbox>
                                        ))}
                                    </CheckboxGroup>
                                </div>

                                {/* Botón Guardar  */}
                                <div className="d-flex justify-content-center">
                                    {isValidAreasForm ? (
                                        // Si isValidForm es true, el botón se muestra
                                        <Button variant="faded" className="bg-orange text-white"
                                            type="submit" data-bs-dismiss="modal" >
                                            Guardar
                                        </Button>
                                    ) : (
                                        // Si isValidForm es false, no se muestra el botón
                                        <>
                                            <Button isDisabled variant="faded" className="bg-orange text-white"
                                                type="submit" data-bs-dismiss="modal" >
                                                Guardar
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            {/* Modal de Cerrar */}
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal"
                                onClick={() => { resetAreasForm() }}>Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>



            {/* ------- Modal de Datos Personales Usuario -------*/}
            <div className="modal fade" id="modal-datos-users" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            {/* Título del Modal */}
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Menú Datos Personales del Usuario</h1>
                            {/* Botón X de cerrar */}
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                onClick={() => {
                                    getUsuarios(); resetCreateForm();
                                    getDatospers();
                                }}></button>
                        </div>
                        {/* Formulario para modificar los datos personales */}
                        <div className="modal-body">
                            {/* Input Nombres */}
                            <h1 className="modal-title fs-6" id="staticBackdropLabel"
                                style={{ marginBottom: 10 }}>Es obligatorio modificar al menos un campo</h1>
                            <form onSubmit={modifydatospers}>
                                <Input
                                    isClearable
                                    value={nombre_personalnuevo}
                                    type="text"
                                    label="Nombre(s)"
                                    placeholder="Ingrese su nombre"
                                    variant="bordered"
                                    isInvalidUser={isValidNombreMod}
                                    color={isValidNombreMod ? "success" : "danger"}
                                    errorMessage={!isValidNombreMod && "Información inválido"}
                                    onChange={(e) => setNombrePersonalNuevo(e.target.value)}
                                    className="max-w-xs"
                                />
                                <div style={{ marginTop: 15 }}></div>
                                {/* Input Primer Apellido */}
                                <Input
                                    label="Primer Apellido"
                                    variant="bordered"
                                    placeholder="Ingrese su primer apellido"
                                    value={primer_apellidonuevo}
                                    isInvalidPassword={isValidPrimerApellidoMod}
                                    color={isValidPrimerApellidoMod ? "success" : "danger"}
                                    errorMessage={!isValidPrimerApellidoMod && "Información inválida"}
                                    onChange={(e) => setPrimerApellidoNuevo(e.target.value)}
                                    type={"text"}
                                    className="max-w-xs"
                                />
                                <div style={{ marginTop: 15 }}></div>
                                {/* Input Segundo Apellido */}
                                <Input
                                    label="Segundo Apellido"
                                    variant="bordered"
                                    placeholder="Ingrese su segundo apellido"
                                    value={segundo_apellidonuevo}
                                    isValid={isValidSegundoApellidoMod}
                                    color={isValidSegundoApellidoMod ? "success" : "danger"}
                                    errorMessage={!isValidSegundoApellidoMod && "Información inválida"}
                                    onChange={(e) => setSegundoApellidoNuevo(e.target.value)}
                                    type={"text"}
                                    className="max-w-xs"
                                />
                                <div style={{ marginTop: 15 }}></div>
                                <Input
                                    label="Número de Teléfono (10 dígitos)"
                                    variant="bordered"
                                    placeholder="Ingrese su número de teléfono"
                                    value={telefononuevo}
                                    isValid={isValidTelefonoMod}
                                    color={isValidTelefonoMod ? "success" : "danger"}
                                    errorMessage={!isValidTelefonoMod && "Información inválido"}
                                    onChange={(e) => setTelefonoNuevo(e.target.value)}
                                    type={"text"}
                                    className="max-w-xs"
                                />

                                {/* Botón Guardar */}
                                <div className="d-flex justify-content-center">
                                    {isValidModifyForm ? (
                                        // Si isValidForm es true, el botón se muestra
                                        <Button variant="faded" className="bg-orange text-white"
                                            type="submit" data-bs-dismiss="modal" >
                                            Guardar
                                        </Button>
                                    ) : (
                                        // Si isValidForm es false, no se muestra el botón
                                        <>
                                            <Button isDisabled variant="faded" className="bg-orange text-white"
                                                type="submit" data-bs-dismiss="modal" >
                                                Guardar
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </form>

                        </div>
                        <div className="modal-footer">
                            {/* Modal de Cerrar */}
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal"
                                onClick={() => {
                                    getUsuarios(); resetModifyForm();
                                    getDatospers();
                                }}>Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ------- Modal Ver Contraseña -------*/}
            <div className="modal fade" id="modal-contraseña-user" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            {/* Título del Modal */}
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Menú Contraseña del Usuario</h1>
                            {/* Botón X de cerrar */}
                            <button type="button"
                                className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        {/* Ver contraseña del usuario */}
                        <div className="modal-body">
                            <form onSubmit={modifycontraseña}>
                                <Input
                                    isClearable
                                    value={contraseñaUser}
                                    label="Contraseña"
                                    variant="bordered"
                                    className="max-w-xs"
                                    onChange={(e) => setContraseñaUser(e.target.value)}
                                    endContent={
                                        <button className="focus:outline-none" type="button" onClick={toggleVisibilityPasswordMod}>
                                            {isVisiblePasswordMod ? (
                                                <EyeOutlined className="text-2xl text-default-400 pointer-events-none" />
                                            ) : (
                                                <EyeInvisibleOutlined className="text-2xl text-default-400 pointer-events-none" />
                                            )}
                                        </button>
                                    }
                                    type={isVisiblePasswordMod ? "text" : "password"}
                                />
                                <div style={{ marginTop: 15 }}></div>
                                {/* Botón Guardar */}
                                <div className="d-flex justify-content-center">
                                    {isValidPasswordMod ? (
                                        // Si isValidForm es true, el botón se muestra
                                        <Button variant="faded" className="bg-orange text-white"
                                            type="submit" data-bs-dismiss="modal" >
                                            Guardar
                                        </Button>
                                    ) : (
                                        // Si isValidForm es false, no se muestra el botón
                                        <>
                                            <Button isDisabled variant="faded" className="bg-orange text-white"
                                                type="submit" data-bs-dismiss="modal" >
                                                Guardar
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </form>
                        </div>

                    </div>
                    <div className="modal-footer">
                        {/* Modal de Cerrar */}
                        <button>Cerrar</button>
                    </div>
                </div>
            </div>


        </>
    )
};

export default CompShowUsuarios;