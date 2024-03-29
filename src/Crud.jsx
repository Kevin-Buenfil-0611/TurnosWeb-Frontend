import Encabezado from "./comps/encabezado";
import CompShowAreas from "./comps/ShowArea";
import CompShowUsuarios from './comps/ShowUsuarios';
import CompShowCajas from './comps/ShowCaja';
import CompShowPermisos from "./comps/ShowPermisos";
import CompShowVideos from "./comps/ShowVideos";
import "./styles/stylesCrud.css"

const Crud = () => {

    return (
        <>
            {/* Componente del encabezado */}
            <Encabezado nombreIcon="bi bi-database-fill-gear" textoTitulo="Pantalla de Administrador"></Encabezado>

            {/* Barra de Navegación entre CRUDS */}
            <ul className="nav nav-pills mb-3" id="crud-tab" role="tablist" style={{
                marginTop: 10, justifyContent: "center"
            }}>
                <li className="nav-item pill-1" role="presentation">
                    <button className="nav-link active" id="pills-areas-tab" data-bs-toggle="pill" data-bs-target="#pills-area"
                        type="button" role="tab" aria-controls="pills-area" aria-selected="true"
                        style={{ margin: "3px 5px 3px 5px" }}
                    >Áreas</button>
                </li>
                <li className="nav-item pill-2" role="presentation">
                    <button className="nav-link" id="pills-caja-tab" data-bs-toggle="pill" data-bs-target="#pills-caja"
                        type="button" role="tab" aria-controls="pills-caja" aria-selected="false"
                        style={{ margin: "3px 5px 3px 5px" }}
                    >Cajas</button>
                </li>
                <li className="nav-item pill-3" role="presentation">
                    <button className="nav-link" id="pills-usuarios-tab" data-bs-toggle="pill" data-bs-target="#pills-usuarios"
                        type="button" role="tab" aria-controls="pills-usuarios" aria-selected="false"
                        style={{ margin: "3px 5px 3px 5px" }}
                    >Usuarios</button>
                </li>
                <li className="nav-item pill-4" role="presentation">
                    <button className="nav-link" id="pills-permisos-tab" data-bs-toggle="pill" data-bs-target="#pills-permisos"
                        type="button" role="tab" aria-controls="pills-permisos" aria-selected="false"
                        style={{ margin: "3px 5px 3px 5px" }}
                    >Permisos</button>
                </li>
                <li className="nav-item pill-5" role="presentation">
                    <button className="nav-link" id="pills-permisos-tab" data-bs-toggle="pill" data-bs-target="#pills-videos"
                        type="button" role="tab" aria-controls="pills-permisos" aria-selected="false"
                        style={{ margin: "3px 5px 3px 5px" }}
                    >Videos</button>
                </li>

            </ul>

            <div className="tab-content" id="pills-tabContent">
                {/* Pestaña tabla Áreas */}
                <div className="tab-pane fade show active" id="pills-area" role="tabpanel"
                    aria-labelledby="pills-areas-tab" tabIndex="0">
                    <CompShowAreas></CompShowAreas>
                </div>
                {/* Pestaña tabla Caja*/}
                <div className="tab-pane fade" id="pills-caja" role="tabpanel"
                    aria-labelledby="pills-caja-tab" tabIndex="0">
                    <CompShowCajas></CompShowCajas>
                </div>
                {/* Pestaña tabla Usuarios */}
                <div className="tab-pane fade" id="pills-usuarios" role="tabpanel"
                    aria-labelledby="pills-usuarios-tab" tabIndex="0">
                    <CompShowUsuarios></CompShowUsuarios>
                </div>
                {/* Pestaña tabla Permisos */}
                <div className="tab-pane fade" id="pills-permisos" role="tabpanel"
                    aria-labelledby="pills-permisos-tab" tabIndex="0">
                    <CompShowPermisos></CompShowPermisos>
                </div>
                {/* Pestaña tabla Permisos */}
                <div className="tab-pane fade" id="pills-videos" role="tabpanel"
                    aria-labelledby="pills-permisos-tab" tabIndex="0">
                    <CompShowVideos></CompShowVideos>
                </div>
            </div>
        </>
    );
};

export default Crud;
