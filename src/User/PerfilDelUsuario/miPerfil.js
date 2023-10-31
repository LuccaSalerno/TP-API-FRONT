import React, { useState } from 'react';
import './/MiPerfil.css';
import lapiz from '../../recursos/lapizmodificar.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import NavBarComponente from '../navbar/navbar';

function PerfilComponente(){

    const navigate = useNavigate();
    const location = useLocation();

    const persona = location.state && location.state.persona;

    function Modificar(){
        navigate('/modificar-perfil', {state: {persona: persona}})
    }

    return(
        <div className='Home'>
            <NavBarComponente/>
            <div>
                <button className='btn-modificar' onClick={Modificar}><img src={lapiz} style={{width:"20px", height:"20px"}}></img></button>
                <div className='datos-usuario'>
                    <h5>Nombre:</h5>
                    <p style={{backgroundColor:"white"}}>{persona.nombre}</p>
                    <h5>Numero de Documento:</h5>
                    <p style={{backgroundColor:"white"}}>{persona.documento}</p>
                    <h5>Mail:</h5>
                    <p style={{backgroundColor:"white"}}>{persona.mail}</p>
                    <h5>Contraseña:</h5>
                    <p style={{backgroundColor:"white"}}>{persona.password}</p>
                </div>
            </div>
        </div>
    );
}

export default PerfilComponente;