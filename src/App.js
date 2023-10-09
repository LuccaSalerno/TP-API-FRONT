import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import LoginComponente from './Login';
import InicioComponente from './Reclamo';
import Edificios from './Componentes/Edificios';
import Unidades from './Componentes/Unidades';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/login' element={<LoginComponente/>} />
        <Route exact path='/inicio' element={<InicioComponente/>} />
        <Route exact path='/edificios' element={<Edificios/>} />
        <Route exact path='/edificios/:id' element={<Unidades/>} />
      </Routes>
    </Router>
  );
}

export default App;
