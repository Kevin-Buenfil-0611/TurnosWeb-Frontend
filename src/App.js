//Importación de todas las páginas
import Login from './Login';
import Caja from './Caja';
import Mostrador from './Mostrador';
import ListaEspera from './ListaEspera';
import Crud from './Crud';
import NoAutorizado from './NoAutorizado';
import NoAutenticado from './NoAutenticado';
import Layout from './Layout';
import { Routes, Route } from 'react-router-dom';
import RequireAuth from './RequireAuth';
import HomePage from './HomePage';


function App() {

    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                {/* Rutas públicas */}
                <Route path='/' element={<Login />} />
                <Route path='ListaEspera' element={<ListaEspera />} />
                <Route path='NoAutorizado' element={<NoAutorizado />} />
                <Route path='NoAutenticado' element={<NoAutenticado />} />

                {/* Rutas privadas */}
                <Route element={<RequireAuth permisosConcedidos={["Home"]} />}>
                    <Route path='/Home' element={<HomePage />} />
                </Route>

                <Route element={<RequireAuth permisosConcedidos={["Administrador"]} />}>
                    <Route path='Crud' element={<Crud />} />
                </Route>

                <Route element={<RequireAuth permisosConcedidos={["Caja"]} />}>
                    <Route path='Caja' element={<Caja />} />
                </Route>

                <Route element={<RequireAuth permisosConcedidos={["Mostrador"]} />}>
                    <Route path='Mostrador' element={<Mostrador />} />
                </Route>

            </Route>
        </Routes>

    );
}

export default App;