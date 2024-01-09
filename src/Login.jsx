import React, { useState } from "react";
import './styles/stylesLogin.css';
import Encabezado from "./comps/encabezado";
import TextoTitulo from "./comps/textoTitulos";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    return (
        <>
            {/* Contenedor del encabezado */}
            <Encabezado nombreIcon="bi bi-house-door-fill" textoTitulo="Login"></Encabezado>
            {/* Contenedor de todo el input del login */}
            <div className="centrarLogin">
                <div class="form-group" className="loginPrincipal">
                    <div style={{ marginTop: 10 }}>
                        <TextoTitulo tamaño={"h1"} texto="Bienvenido" color="white"></TextoTitulo>
                    </div>

                    {/* Contenedor de la parte de usuario, contraseña y botón */}
                    {/* Usuario */}
                    <div className="inputContainer">
                        <div class="form-group" style={{
                            marginBottom: 10, marginLeft: 10, marginRight: 10
                        }}>
                            <p class="h4" style={{
                                fontWeight: "bold", marginTop: 10, color: "white"
                            }}>Usuario</p>
                            <input type="text" class="form-control" placeholder="Usuario" />
                        </div>
                        {/* Contraseña*/}
                        <div class="form-group" style={{ marginLeft: 10, marginRight: 10, marginBottom: 10 }}>
                            <p className="h4" style={{
                                fontWeight: "bold", marginTop: 10, color: "white"
                            }}>Contraseña</p>
                            <div className="d-flex align-items-center" style={{ backgroundColor: "white" }}>
                                <input type={showPassword ? "text" : "password"} class="form-control"
                                    placeholder="Contraseña" style={{
                                        borderRadius: 0, border: "none"
                                    }} />
                                <div onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <i class="bi bi-eye" style={{
                                        color: "orangered;", fontSize: 20,
                                        marginLeft: 5, marginRight: 3
                                    }}></i> :
                                        <i class="bi bi-eye-slash" style={{
                                            color: "orangered", fontSize: 20, marginLeft: 5, marginRight: 3
                                        }}></i>}
                                </div>
                            </div>
                            <small class="form-text text-muted">No compartir tu contraseña con nadie</small>
                        </div>
                        {/* Botón de inicio de sesión*/}
                        <div className="d-flex flex-column align-items-center" style={{
                            marginLeft: 10,
                            marginRight: 10, marginBottom: 10
                        }}>
                            <button type="button" class="btn" className="loginButton">Inicior Sesión</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Login;
