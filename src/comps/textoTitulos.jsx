import React from "react";

function TextoTitulo(props) {
    return (<p className={props.tamaño} style={{
        fontWeight: "bold", color: props.color,
        textAlign: "center", fontFamily: "Nunito", maxWidth: '100%'
    }}> {props.texto}</p>)
}

export default TextoTitulo;