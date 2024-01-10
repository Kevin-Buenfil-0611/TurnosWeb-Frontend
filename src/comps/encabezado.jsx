import React from "react";
import LogoAyuntamiento from "./LogoAyuntamiento.webp";

function Encabezado(props) {

    return (<div class="d-flex justify-content-between align-items-center" style={{
        backgroundColor: "#FA770F"
    }}>
        <i className={props.nombreIcon} style={{
            color: "#ffffff", fontSize: "calc(1.4rem + 1.4vw)", marginLeft: 10
        }}></i>
        <p className="h1" style={{
            fontWeight: "bold", color: "white",
            fontFamily: "Segoe UI", textAlign: "center",
            marginLeft: 10, marginRight: 10
        }}> {props.textoTitulo}</p>
        <img src={LogoAyuntamiento} className="img-fluid" alt="Error" style={{
            marginRight: 10, width: "auto"
        }} />
    </div>)
}
export default Encabezado;