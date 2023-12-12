import React, { useState } from "react";
import './styles/stylesLogin.css';
import { Button } from "@nextui-org/react";
import logoMunicipio from './LogoAyuntamiento.webp'

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const onChange = ({ currentTarget }) => setPassword(currentTarget.value);
    const [shown, setShown] = React.useState(false);
    const switchShown = () => setShown(!shown);

    return (
        <div className="containerLogin">
            <div className="tituloContainer">
                <h1 className="encabezadoText"> Página de Inicio</h1>
                <img src={logoMunicipio} alt="Error" className="logoMunicipio" />
            </div>
            <div className="loginPrincipal">
                <h1 className="tittle">Bienvenido</h1>

                <form className="containerAccess">
                    <div className="usernameContainer">
                        <label style={{ paddingRight: 10 }}>Usuario:</label>
                        <input
                            label="Usuario"
                            type="text"
                            id="username"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                        />
                    </div>

                    <div className="passwordClassname">
                        <label style={{ paddingRight: 10 }}>Contraseña:</label>
                        <input
                            onChange={onChange}
                            type={shown ? 'text' : 'password'}
                            value={password}
                        />
                        <button onClick={switchShown}>
                            {shown ? 'Ocultar' : 'Mostrar'}
                        </button>

                    </div>
                    <Button className="buttonLogin">
                        Iniciar Sesión
                    </Button>
                </form>
            </div>

        </div>
    );
};

export default Login;
