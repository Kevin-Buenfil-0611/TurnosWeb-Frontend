import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import axios from "axios";
import './styles/stylesLogin.css';
import Encabezado from "./comps/encabezado";
import TextoTitulo from "./comps/textoTitulos";
import { Input, Button } from "@nextui-org/react";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

//Dirección del backend para acceder a los métodos de la base de datos
const URI = 'http://localhost:8000/login/'
const Login = () => {
    //Constantes para navegar  me quede en el video min 17.46
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/Home";

    //Mensajes de Error
    const [errMsg, setErrMsg] = useState('')
    const userRef = useRef();
    const errRef = useRef();


    //Input Usuario
    const [usuario, setUsuario] = useState('');

    const validateUsuario = (usuario) => usuario.trim() !== '';

    const isValidUsuario = React.useMemo(() => {
        return validateUsuario(usuario);
    }, [usuario]);

    //Input Contraseña
    const [contraseña, setContraseña] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const validateContraseña = (contraseña) => contraseña.trim() !== '';

    const isValidPassword = React.useMemo(() => {
        return validateContraseña(contraseña);
    }, [contraseña]);

    //Validar si el inicio de sesión es correcto


    const find = async (e) => {
        e.preventDefault();
        try {
            //Validar el login y redirigir a la página
            const autentificacion = await axios.post(URI, { usuario: usuario, contraseña: contraseña });

            if (autentificacion.data.autorizado) {
                //Guardar en local storage y eliminar los set de arriba, guardar directo en el ls
                //Pasarle los datos al ls direcctos de autentificacion.data
                localStorage.setItem("autorizado", autentificacion.data.autorizado);
                localStorage.setItem("listaPermisos", autentificacion.data.permisos);
                localStorage.setItem("usuario", autentificacion.data.usuario);

                const autorizado = localStorage.getItem("autorizado");
                const permisosStorage = localStorage.getItem("listaPermisos");

                let listaPermisos = permisosStorage.split(',');

                setAuth({ usuario, autorizado, listaPermisos });
                navigate(from, { replace: true });
            } else {
                setErrMsg('Credenciales incorrectas');
            }

        } catch (err) {
            //Mensajes de error
            if (!err?.response) {
                setErrMsg('El servidor no responde');
            } else if (err.response?.status === 400) {
                setErrMsg('Usuario o contraseña incorrecto');
            } else if (err.response?.status === 401) {
                setErrMsg('Sin Autorización');
            } else {
                setErrMsg('Login Fallido');
            }
            errRef.current.focus();
        }

    }
    return (
        <>
            {/* Contenedor del encabezado */}
            <Encabezado nombreIcon="bi bi-house-door-fill" textoTitulo="Login"></Encabezado>
            {/* Contenedor de todo el input del login */}
            <div className="centrarLogin">
                <div class="form-group" className="loginPrincipal">
                    <div style={{ marginTop: 10 }}></div>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <TextoTitulo tamaño={"h1"} texto="Bienvenido" color="#FDFEFE"></TextoTitulo>

                    <TextoTitulo tamaño={"h3"} texto="Ingrese sus datos" color="#FDFEFE"></TextoTitulo>
                    {/* Contenedor de la parte de usuario, contraseña y botón */}
                    {/* Usuario */}
                    <form onSubmit={find} style={{ margin: 20 }}>
                        <Input
                            value={usuario}
                            type="text"
                            label="Usuario"
                            placeholder="Ingrese su usuario"
                            variant="bordered"
                            ref={userRef}
                            isValidArea={!isValidUsuario}
                            onChange={(e) => setUsuario(e.target.value)}
                            className="max-w-xs"
                            classNames={{
                                label: "text-white",
                                input: "text-white"
                            }}
                            required
                        />
                        <div style={{ marginTop: 15 }}></div>
                        <Input
                            label="Contraseña"
                            variant="bordered"
                            placeholder="Ingrese su contraseña"
                            value={contraseña}
                            isValidPassword={isValidPassword}
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
                            classNames={{
                                label: "text-white",
                                input: "text-white"
                            }}
                            required
                        />
                        <small className="form-text text-white">No compartir tu contraseña con nadie</small>
                        {/* Botón de inicio de sesión*/}
                        <div className="d-flex flex-column align-items-center" style={{
                            margin: 10
                        }}>
                            <Button variant="faded" className="bg-ff9821 text-white"
                                type="submit">
                                Iniciar Sesión
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
