import react from react

function Encabezado(props) {
    return (<nav class="navbar bg-body-tertiary" className="encabezadoContainer">
        <h1 className="clockIcon"><FontAwesomeIcon icon={props.nombreIcono} style={{ color: "#ffffff", }} /> </h1>
        <p class="h1" style={{
            fontWeight: "bold", color: "white",
            textAlign: "left", marginLeft: 10, fontFamily: "Nunito"
        }}>{props.titulo}</p>
        <img src={logoMunicipio} alt="Error" className="logoMunicipio" />
    </nav>)
}