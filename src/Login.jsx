import React, { useState } from "react";
import './styles/stylesLogin.css';
import logoMunicipio from './LogoAyuntamiento.webp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseChimney } from '@fortawesome/free-solid-svg-icons'

const Login = () => {

    return (
        <>
            {/* Contenedor del encabezado */}
            <nav class="navbar bg-body-tertiary" className="tituloContainer">
                <h1 className="homeIcon"><FontAwesomeIcon icon={faHouseChimney} style={{ color: "#ffffff", }} /> </h1>
                <p class="h1" style={{
                    fontWeight: "bold", color: "white",
                    textAlign: "left", marginLeft: 10, fontFamily: "Nunito"
                }}>Inicio de Sesión</p>
                <img src={logoMunicipio} alt="Error" className="logoMunicipio" />
            </nav>
            {/* Contenedor de todo el input del login */}
            <div className="centrarLogin">
                <div class="form-group" className="loginPrincipal">
                    <p class="h1" style={{
                        fontWeight: "bold", color: "white", marginTop: 10, textAlign: "center"
                    }}>Bienvenido</p>
                    {/* Contenedor de la parte de usuario, contraseña y botón */}
                    {/* Usuario */}
                    <div className="inputContainer">
                        <div class="form-group" style={{
                            marginBottom: 10, marginLeft: 10, marginRight: 10, marginBottom: 10
                        }}>
                            <p class="h4" style={{ fontWeight: "bold", marginTop: 10, }}>Usuario</p>
                            <input type="text" class="form-control" placeholder="Usuario" />
                        </div>
                        {/* Contraseña*/}
                        <div class="form-group" style={{ marginLeft: 10, marginRight: 10, marginBottom: 10 }}>
                            <p className="h4" style={{ fontWeight: "bold", marginTop: 10 }}>Contraseña</p>
                            <input type="password" class="form-control" placeholder="Contraseña" />
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
