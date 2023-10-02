import logo from './logo.svg';
import './App.css';

import {BrowserRouter as Router, Route, Routes, Redirect} from 'react-router-dom';

import LoginComponente from './Login';
import InicioComponente from './PantallaInicio';

//Acá van los componentes, tambien puedo crearlos a parte como archivos .js e importarlos
//En esta funcion App(), pongo los componentes y html <Componente />, tegno qeu imporar las funciones, 
//  no puedo todo el archivo

function App() {
  return (
    <Router>
      
        <Route exact path='/login' component={LoginComponente} />
        <Route exact path='/inicio' component={InicioComponente} />
    
    </Router>
  );

  /*
<header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reloads.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Hola />
      </header>
  */

  
}

export default App;
