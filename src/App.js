import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import LoginComponente from './Login';
import InicioComponente from './Reclamo';
import Edificios from './Componentes/Edificios';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/login' element={<LoginComponente/>} />
        <Route exact path='/inicio' element={<InicioComponente/>} />
        <Route exact path='/edificios' element={<Edificios/>} />
      </Routes>
    </Router>
  );
}

export default App;
