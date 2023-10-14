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

    function MiEdificio(){
        navigate('/mi-edificio', { state: { persona: persona } });
      }

    return(
        <div className='Home'>
            <header>
                <nav>
                    <ul>
                        <li><a href="/home">Home</a></li>
                        <li><a href='/reclamo-unidad' onClick={ReclamarUnidad}>Reclamar Unidad</a></li>
                        <li><a  href='/reclamo-comun' onClick={ReclamarComun}>Reclamar Sector Comun</a></li>
                        <li><a  href='/mi-edificio'onClick={MiEdificio}>Mi Edificio</a></li>
                        <li><a  href='https://www.google.com.ar/'>Cerrar Sesión</a></li>
                    </ul>
                </nav>
            </header>
            <div>
            
                <h1 className='bienvenida'>¡Bienvenido/a {persona.nombre}!</h1>

                <p className='parrafo-bienvenida'>
                    En nuestro portal, ofrecemos una plataforma fácil y segura para presentar reclamos relacionados 
                    con edificios. Ya sea problemas con la administración, servicios o mantenimiento, estamos aquí para
                    escucharte. Simplificamos el proceso de comunicación entre residentes y administradores, asegurando 
                    un ambiente habitable y armonioso para todos. ¡Tu voz es importante para mantener nuestros hogares en
                    perfecto estado!
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