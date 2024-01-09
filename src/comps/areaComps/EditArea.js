import axios from "axios";
import { useEffect, useState } from "react";

const URI = 'http://localhost:8000/areas/';


const CompEditArea = () => {
    const [nombre_area, setNombre_area] = useState('');
    const [estatus, setEstatus] = useState('');
    const id = 1;
    //Procedimiento para Actualizar
    const updateArea = async (e) => {
        e.preventDefault()
        await axios.put(URI + id, {
            nombre_area: nombre_area,
            estatus: estatus
        })
        console.log(URI + id);
    }

    useEffect(() => {
        getAreaId()
    }, { id })
    //Obtener ID del Área
    const getAreaId = async () => {
        const res = await axios.get(URI + id)
        setNombre_area(res.data.nombre_area);
        setEstatus(res.data.estatus);
    }


    return (
        <>
            <form onSubmit={updateArea}>
                <input
                    placeholder="Nombre del área"
                    value={nombre_area}
                    onChange={(e) => setNombre_area(e.target.value)}
                    type="text"
                    className="form-control"
                />
                <select name="estatus"
                    value={estatus}
                    onChange={(e) => setEstatus(e.target.value)}
                >
                    <option value="1">Activo</option>
                    <option value="0">Inactivo</option>
                </select>
                <button type="submit" data-bs-dismiss="modal">Guardar</button>
                <input
                    type="hidden"
                    name="id"
                    value={id}
                />
            </form>

        </>
    )
}

export default CompEditArea;