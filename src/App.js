import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import LoginComponente from './Login';
import LoginAdministradorComponente from './LoginAdm';
import ReclamoComponente from './Reclamo';
import HomeComponente from './Home';
import ReclamoComunComponente from './ReclamoComun';
import Edificios from './Componentes/Edificios';
import Unidades from './Componentes/Unidades'
import MiEdificioComponente from './User/MiEdificio';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/login' element={<LoginComponente/>} />
        <Route exact path='/login-administrador' element={<LoginAdministradorComponente/>}/>
        <Route exact path='/home' element={<HomeComponente/>} />
        <Route exact path='/reclamo-unidad' element={<ReclamoComponente/>} />
        <Route exact path='/reclamo-comun' element={<ReclamoComunComponente/>} />
        <Route exact path='/mi-edificio' element={<MiEdificioComponente/>} />
        <Route exact path='/edificios' element={<Edificios/>} />
        <Route exact path='/edificios/:id' element={<Unidades/>} />
      </Routes>
    </Router>
  );
}

export default App;
