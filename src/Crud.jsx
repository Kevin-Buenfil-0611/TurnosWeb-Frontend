import './styles/stylesLogin.css';
import Encabezado from "./comps/encabezado";
import CompShowAreas from "./comps/areaComps/ShowArea";
import CompShowUsuarios from './comps/usuarioComps/ShowUsuarios';
import "./styles/stylesCrud.css"



const Crud = () => {

    return (
        <>
            {/* Componente del encabezado */}
            <Encabezado nombreIcon="bi bi-database-fill-gear" textoTitulo="Pantalla de Administrador"></Encabezado>

            {/* Barra de Navegación entre CRUDS */}
            <ul class="nav nav-pills mb-3" id="crud-tab" role="tablist" style={{
                marginTop: 10, justifyContent: "center"
            }}>
                <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="pills-areas-tab" data-bs-toggle="pill" data-bs-target="#pills-area" type="button" role="tab" aria-controls="pills-area" aria-selected="true">Áreas</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="pills-caja-tab" data-bs-toggle="pill" data-bs-target="#pills-caja" type="button" role="tab" aria-controls="pills-caja" aria-selected="false">Cajas</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="pills-usuarios-tab" data-bs-toggle="pill" data-bs-target="#pills-usuarios" type="button" role="tab" aria-controls="pills-usuarios" aria-selected="false">Usuarios</button>
                </li>

            </ul>

            <div class="tab-content" id="pills-tabContent">
                {/* Pestaña tabla Áreas */}
                <div class="tab-pane fade show active" id="pills-area"
                    role="tabpanel" aria-labelledby="pills-areas-tab" tabindex="0">
                    <CompShowAreas></CompShowAreas>
                </div>
                {/* Pestaña tabla Caja*/}
                <div class="tab-pane fade" id="pills-caja" role="tabpanel"
                    aria-labelledby="pills-caja-tab" tabindex="0">
                    Hola Mundo
                </div>
                {/* Pestaña tabla Usuarios */}
                <div class="tab-pane fade" id="pills-usuarios" role="tabpanel"
                    aria-labelledby="pills-usuarios-tab" tabindex="0">
                    <CompShowUsuarios></CompShowUsuarios>
                </div>

            </div>
        </>
    );
};

export default Crud;
