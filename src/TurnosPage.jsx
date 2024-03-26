import React, { useState, useEffect } from "react";
import axios from "axios";
import LogoAyuntamiento from "./comps/LogoAyuntamiento.webp"
import ReproductorVideo from "./comps/ReproductorVideo";

const URI = 'http://localhost:8000/turnos/';
const URITurno = 'http://localhost:8000/turnos/siguiente'


const TurnosPage = () => {
    //Procedimiento para mostrar todas los Turnos
    const [turnos, setTurnos] = useState([])
    useEffect(() => {
        getTurnos()
    }, [])

    const getTurnos = async () => {
        const res = await axios.get(URI)
        setTurnos(res.data)
    }
    //Procedimiento para mostrar todas los Turnos
    const [turnoNuevo, setTurnoNuevo] = useState([])
    useEffect(() => {
        getTurnoNuevo()
    }, [])

    const getTurnoNuevo = async () => {
        const resTurno = await axios.get(URITurno)
        setTurnoNuevo(resTurno.data)
    }
    //Información del nuevo turno
    function mostrarInformacionTurno() {
        const textoTurno = "Turno " + turnoNuevo.turno_id;

        const NumeroDelTurno = (
            <p style={{
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: '10vh',
                color: 'white'
            }}>{textoTurno}</p>
        );

        const DatosDelTurno = (
            <p style={{
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: '10vh',
                color: 'white'
            }}>{turnoNuevo.nombre_area}</p>
        );

        const CajaDelTurno = (
            <p style={{
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: '10vh',
                color: 'white'
            }}>{turnoNuevo.nombre_area}</p>
        );

        return (
            <div>
                {NumeroDelTurno}
                {DatosDelTurno}
            </div>
        );
    }

    return (
        <>

            <div className="d-flex " style={{ height: '100%' }}>
                <div className="col-6" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div className="d-flex">
                        {/* Este div contiene la imagen */}
                        <div className="col-3 d-flex justify-content-center align-items-center">
                            <img src={LogoAyuntamiento} className="img-fluid" alt="Error" style={{
                                maxWidth: "20vw", height: "20vh", borderRadius: "50%"
                            }} />
                        </div>
                        {/* Este div contiene los textos */}
                        <div className="col-9">
                            <div className="d-flex justify-content-center" style={{
                                backgroundColor: "#FC8B0D", borderRadius: "2rem",
                                border: "solid 0.2rem", borderColor: "orangered",
                                flexDirection: "column", margin: "0px 10px 0px 10px"
                            }}>
                                {/* <p style={{
                                    fontWeight: 'bold', textAlign: 'center',
                                    fontSize: '60px', color: "white"
                                }}>
                                    Turno Actual
                                </p> */}
                                <div>{mostrarInformacionTurno()}</div>
                            </div>
                        </div>
                    </div>
                    {/* Videos de publicidad */}
                    <div className="d-flex justify-content-center" style={{ width: '100%' }}>
                        <ReproductorVideo />
                    </div>
                </div>




                {/* Lista de los turnos en Espera 
            Preguntar si se crea un nuevo campo en la tabla cajas llamado Módulo
            Ordena los turnos por fecha, preguntar si cada área debe tener su
            número de turno interno */}
                <div className="col-6" >
                    <table className="table table-striped table-bordered border-black align-middle">
                        <thead className="table-dark">
                            {/* Encabezados de la tabla */}
                            <tr>
                                <th scope="col">Turno</th>
                                <th scope="col">Área</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Ciclo para obtener la información de la DB */}
                            {turnos ? (
                                turnos.map((turno) => (
                                    <tr key={turno.id}>
                                        <th scope="row">{turno.nombre_area}</th>
                                        <td>{turno.id}</td>
                                    </tr>
                                ))
                            ) : (
                                <></>
                            )}
                        </tbody>
                    </table>
                </div >
            </div>
        </ >
    )
};
export default TurnosPage;