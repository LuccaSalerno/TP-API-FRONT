import React, { useState } from 'react';
import './Home.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function HomeComponente(){

    const navigate = useNavigate();
    const location = useLocation();

    const persona = location.state && location.state.persona;

    //Si toca el boton para Reportar desperfecto en una unidad en particular
    function ReclamarUnidad(){
        navigate('/reclamo-unidad', { state: { persona: persona } });
    }

    //Si toca el boton para Reportar desperfecto en una parte comunitaria
    function ReclamarComun(){
        navigate('/reclamo-comun', { state: { persona: persona } });
    }


    return(
        <div className='Home'>
            <header>
                <nav>
                    <ul>
                        <li><a href="/home">Home</a></li>
                        <li><a href="https://www.google.com.ar/">Hacer Reclamo</a></li>
                        <li><a href="https://www.google.com.ar/">Ver Reclamos</a></li>
                    </ul>
                </nav>
            </header>
            <div>
            
                <h1 className='bienvenida'>¡Bienvenido/a {persona.nombre}!</h1>

                <p className='parrafo-bienvenida'>
                Texto presentacion
                </p>


                <div className="container">
                    <div className="text-button-container">
                        <div className="text">Reportar desperfecto en una unidad en particular</div>
                        <button id="button1" className="button" onClick={ReclamarUnidad}>Reclamar</button>
                    </div>

                    <div className="text-button-container">
                            <div className="text">Reportar desperfecto en una parte comunitaria</div>
                            <button id="button2" className="button" onClick={ReclamarComun}>Reclamar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeComponente;