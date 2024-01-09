import React from "react";
import LogoAyuntamiento from "./LogoAyuntamiento.webp";

function Encabezado(props) {

    return (<nav class="navbar d-flex" style={{
        backgroundColor: "#FA770F"
    }}>
        <i class={props.nombreIcon} style={{
            color: "#ffffff", fontSize: "calc(1.6rem + 1.6vw)", marginLeft: 15
        }}></i>
        <p className="h1" style={{
            fontWeight: "bold", color: "white",
            fontFamily: "Nunito"
        }}> {props.textoTitulo}</p>
        <img src={LogoAyuntamiento} class="img-fluid" alt="Error" style={{
            width: 100,
            height: 100, marginRight: 15,
        }} />
    </nav>)
}
export default Encabezado;