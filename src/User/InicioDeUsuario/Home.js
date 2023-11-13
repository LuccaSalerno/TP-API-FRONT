import React, { useState, useEffect } from 'react';
import './Home.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import NavBarComponente from '../navbar/navbar';

function HomeComponente(){

    const navigate = useNavigate();
    const location = useLocation();

    const persona = location.state && location.state.persona;

    //para perfil
    //const [estaUsuario, setEstaUsuario] = useState(false);
    //const [usuario, setUsuario] = useState({documento:'', nombre:'', contrasenia:'', mail:''});



    /*
    const obtenerPersona = async () => {
        try {
          const respuesta = await fetch(`http://localhost:8080/api/personas/${persona.documento}`, {
            method: 'GET',
          });
          if (respuesta.ok) {
            console.log('Se encontró el usuario');
            const datosUsuario = await respuesta.json();
            setUsuario({
              ...usuario,
              documento: datosUsuario.documento,
              nombre: datosUsuario.nombre,
              contrasenia: datosUsuario.contrasenia,
              mail: datosUsuario.mail
            });
            //console.log(usuario)
            return true;
          } else {
            console.error('Error al encontrar usuario');
            return false;
          }
        } catch (error) {
          console.log('Error de red', error);
          return false;
        }
      };

      useEffect(() => {
        const cargarUsuario = async () => {
          const resultado = await obtenerPersona();
          if (resultado) {
           setEstaUsuario(true)
          }
        };
          cargarUsuario();
        
      }, []);
    
*/
     

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
            <NavBarComponente/>
            <div>
            
                <h1 className='bienvenida'>¡Bienvenido/a! {persona.documento}</h1>

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