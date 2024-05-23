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
import HomePage from './HomePage';


function App() {

    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                {/* Rutas públicas */}
                <Route path='/Login' element={<Login />} />
                <Route path='ListaEspera' element={<ListaEspera />} />
                <Route path='NoAutorizado' element={<NoAutorizado />} />
                <Route path='NoAutenticado' element={<NoAutenticado />} />

                {/* Rutas privadas */}
                <Route >
                    <Route path='/' element={<HomePage />} />
                </Route>

                <Route>
                    <Route path='Crud' element={<Crud />} />
                </Route>

                <Route >
                    <Route path='Caja' element={<Caja />} />
                </Route>

                <Route >
                    <Route path='Mostrador' element={<Mostrador />} />
                </Route>

            </Route>
        </Routes>

    );
}

export default App;