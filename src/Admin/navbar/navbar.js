import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function NavBarAdminComponente(){

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

    function IrHome(){
        navigate('/home', { state: { persona: persona } });
    }

    function ListadoEdificios(){
        navigate('/edificios', { state: { persona: persona } });
      }

    function Perfil(){
        navigate('/perfil', {state : {persona: persona}})
    }

    return(
        <div className='Home'>
            <header>
                <nav>
                    <ul>
                        <li><a href="/home" onClick={IrHome}>Home</a></li>
                        <li><a href='/reclamo-unidad' onClick={ReclamarUnidad}>Reclamar Unidad</a></li>
                        <li><a  href='/reclamo-comun' onClick={ReclamarComun}>Reclamar Sector Comun</a></li>
                        <li><a  href='/edificios' onClick={ListadoEdificios}>Edificios</a></li>
                        <li><a  href='/perfil'onClick={Perfil}>Perfil</a></li>
                        <li><a  href='/login'>Cerrar Sesión</a></li>
                    </ul>
                </nav>
            </header>
        </div>
    );
}

export default NavBarAdminComponente;