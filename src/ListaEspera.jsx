import React, { useState, useEffect } from "react";
import axios from "axios";
import LogoAyuntamiento from "./comps/LogoAyuntamiento.webp"
import ReproductorVideo from "./comps/ReproductorVideo";

const URI = 'http://localhost:8000/turnos/';
const URITurno = 'http://localhost:8000/turnos/siguiente';
const URIConfig = 'http://localhost:8000/config/nombre';


const ListaEspera = () => {
    //Procedimiento para obtener datos de la configuración
    const [resetLista, setResetLista] = useState(null);

    const getConfig = async () => {
        const res = await axios.post(URIConfig, {
            nombre: 'Reset Lista de Turnos'
        })
        setResetLista(res.data.valor)
    }

    useEffect(() => {
        getConfig();
    }, [])

    //Procedimiento para mostrar todas los Turnos
    const [turnos, setTurnos] = useState([]);
    const getTurnos = async () => {
        const res = await axios.get(URI)
        setTurnos(res.data)
    }
    useEffect(() => {
        if (resetLista !== null) {
            getTurnos();
            const intervalo = setInterval(() => {
                getTurnos();
            }, resetLista);

            return () => clearInterval(intervalo);
        }
    }, [resetLista]); // Dependencia en resetLista


    //Procedimiento para mostrar todas los Turnos
    const [turnoNuevo, setTurnoNuevo] = useState([])
    useEffect(() => {
        if (resetLista !== null) {
            getTurnoNuevo();
            const intervalo = setInterval(() => {
                getTurnoNuevo();
            }, resetLista); // Actualiza cada 10 segundos

            // Limpia el intervalo cuando el componente se desmonta
            return () => clearInterval(intervalo);
        }
    }, [resetLista])

    const getTurnoNuevo = async () => {
        const resTurno = await axios.get(URITurno)
        setTurnoNuevo(resTurno.data)
    }
    //Información del nuevo turno
    function mostrarInformacionTurno() {
        const ultimoTurno = turnoNuevo;
        const NumeroDelTurno = (
            <p style={{
                fontWeight: 'bold', textAlign: 'center',
                fontSize: '5.5vh', color: 'white',
                overflowWrap: "break-word"
            }}>Turno: {ultimoTurno.folio}</p>
        );

        const DatosDelTurno = (
            <p style={{
                fontWeight: 'bold', textAlign: 'center',
                fontSize: '5.5vh', color: 'white',
                overflowWrap: "break-word"
            }}>Área: {ultimoTurno.nombre_area}</p>
        );

        const CajaDelTurno = (
            <p style={{
                fontWeight: 'bold', textAlign: 'center',
                fontSize: '5.5vh', color: 'white',
            }}>Caja: {ultimoTurno.nombre_caja}</p>
        );

        return (
            <div>
                {NumeroDelTurno}
                {DatosDelTurno}
                {CajaDelTurno}
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
                        <div className="col-9" >
                            <div className="d-flex justify-content-center" style={{
                                backgroundColor: "#FC8B0D", borderRadius: "2rem",
                                border: "solid 0.2rem", borderColor: "orangered",
                                flexDirection: "column", margin: "0px 10px 0px 10px",
                                maxHeight: "50vh"
                            }}>
                                <div>{mostrarInformacionTurno()}</div>
                            </div>
                        </div>
                    </div>
                    {/* Videos de publicidad */}
                    <div className="d-flex justify-content-center" style={{ width: '100%' }}>
                        <ReproductorVideo />
                    </div>
                </div>


                <div className="col-6" >
                    <table className="table table-striped table-bordered border-black align-middle">
                        <thead className="table-dark">
                            {/* Encabezados de la tabla */}
                            <tr>
                                <th scope="col">Turno</th>
                                <th scope="col">Área</th>
                                <th scope="col">Caja</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Ciclo para obtener la información de la DB */}
                            {turnos ? (
                                turnos.map((turno) => (
                                    <tr key={turno.id}>
                                        <th scope="row">{turno.folio}</th>
                                        <td>{turno.nombre_area}</td>
                                        <td>{turno.nombre_caja}</td>
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
export default ListaEspera;