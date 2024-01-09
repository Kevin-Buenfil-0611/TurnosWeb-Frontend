import axios from "axios";
import { useState } from "react";

const URI = 'http://localhost:8000/areas/'

const CompCreateArea = () => {
    const [nombre_area, setNombre_area] = useState('');
    const [estatus, setEstatus] = useState('1');

    const store = async (e) => {
        e.preventDefault();
        await axios.post(URI, { nombre_area: nombre_area, estatus: estatus });
    }


    return (
        <>
            <form onSubmit={store}>
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
                <button type="submit">Guardar</button>
            </form>
        </>
    )
}

export default CompCreateArea;