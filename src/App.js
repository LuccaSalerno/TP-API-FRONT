import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import LoginComponente from './Login';
import InicioComponente from './Reclamo';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/login' element={<LoginComponente/>} />
        <Route exact path='/inicio' element={<InicioComponente/>} />
      </Routes>
    </Router>
  );
}

export default App;
