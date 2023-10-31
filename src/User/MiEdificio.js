import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MiEdificio.css';
import imagenOOPS from '../recursos/oops.png';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


function MiEdificioComponente(){

    const navigate = useNavigate();
    const location = useLocation();

    const persona = location.state && location.state.persona;
    //const usuario = useState({documento:persona.documento});
    const [edificio, setEdificio] = useState({codigo:'0', nombre:''});
    const [nombreEdificio, setNombreEdificio] = useState('');
    const [verificarHabilitacion, setVerificarHabilitacion] = useState('a verificar');

    const [reclamos, setReclamos] = useState([]);

    const manejarCambioEntradaEdificio = (e) => {
        const ed = { ...edificio, [e.target.name]: e.target.value };
        setEdificio(ed);
    };

    //Saber si esta habilitado para ver loa reclamos de su edificio, (tiene que ser inquilino o dueño)
    const VerificarHabilitacion = async () => {
        try {
        setVerificarHabilitacion(null)
        const respuesta = await fetch(`http://localhost:8080/api/edificios/personas/habilitadas?documento=${persona.documento}&codigo=${(edificio.codigo)}`);
    
            if (respuesta.ok) {
                console.log("Esta habilitado");
                setVerificarHabilitacion(true);
            }
            else {
                console.log('No está habilitado');
                setVerificarHabilitacion(false);
            }
        } catch (error) {
            console.log('Error al verificar habilitacion');
            setVerificarHabilitacion(false);
        }
    
    };

    //quiero el nombre del edificio
    const ObtenerNombreEdificio = async () => {
        try {
          const respuesta = await fetch(`http://localhost:8080/api/edificios/buscar?codigo=${edificio.codigo}`);
          const datos = await respuesta.json();
          
          // Actualiza el estado con el nombre del edificio
          setNombreEdificio(datos.nombre); // Ajusta según la estructura de tu API
        } catch (error) {
          console.error('Error al obtener el edificio', error);
        }
      };

//Quiero obtener todos los reclamos del edificio al que es duenio o habita
const ObtenerReclamos = async () => {
    try {
        const respuesta = await fetch(`http://localhost:8080/api/edificios/reclamos?codigo=${edificio.codigo}`);
        const datos = await respuesta.json();
        console.log(datos)
          // Actualiza el estado con el nombre del edificio
          setReclamos(datos); // Ajusta según la estructura de tu API
        } catch (error) {
          console.error('Error al obtener reclamos', error);
        }
    }



    
 
    //Navegacion
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

  function MiEdificio(){
    navigate('/mi-edificio', { state: { persona: persona } });
  }





    
    return(
        <div className='PantallaMiEdificio'>
        <header>
            <nav>
                <ul>
                    <li><a href='/home' onClick={IrHome}>Home</a></li>
                    <li><a href='/reclamo-unidad' onClick={ReclamarUnidad}>Reclamar Unidad</a></li>
                    <li><a  href='/reclamo-comun' onClick={ReclamarComun}>Reclamar Sector Comun</a></li>
                    <li><a  href='/mi-edificio'onClick={MiEdificio}>Mi Edificio</a></li>
                    <li><a  href='https://www.google.com.ar/'>Cerrar Sesión</a></li>
                </ul>
            </nav>
        </header>

        <div className='cuerpo'>
            
            <div className='contenedor-edificio'>
                <p>Ingrese el codigo de su edificio del que desea ver los reclamos</p>
                <input className='casilla' type='text' placeholder="Codigo del Edificio" name="codigo" id='codigo' value={edificio.codigo === '0' ? '' : edificio.codigo} onChange={manejarCambioEntradaEdificio} required/>
                <button className='boton-verificar' type='submit' onClick={() => { VerificarHabilitacion(); ObtenerNombreEdificio(); ObtenerReclamos()}}> ver </button>
            </div>
            

            <h2 className='tituloReclamos'>Reclamos</h2>

            
            {verificarHabilitacion === null && (
                <div className='loading'>
                    <div className="spinner"></div>
                    <p>Buscando reclamos de su edificio</p>
                </div>)}
            
            
            
            {verificarHabilitacion === true && (
                <div className='tabla-reclamos'>
                    <h1>{nombreEdificio}</h1><br></br>
                    {reclamos.length > 0 && (
                        <table border="1">
                            <thead>
                            <tr>
                                <th>Nombre de Persona</th>
                                <th>Descripción</th>
                                <th>Estado</th>
                            </tr>
                            </thead>
                            <tbody>
                            {reclamos.map(reclamo => (
                                <tr key={reclamo.id_reclamo}>
                                <td>{`${reclamo.usuario.nombre}`}</td>
                                <td>{reclamo.descripcion}</td>
                                <td>{reclamo.estado}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                     )}
                     {reclamos.length === 0 && (
                        <h3>No hay reclamos</h3>
                     )}
                </div>
            
            )}

            {verificarHabilitacion === false && <div className="ups">
                <img src={imagenOOPS} alt="OOPS!"/>
                <p>Ups, no es dueño ni inquilino de este edificio para visualizar sus reclamos.</p>
                </div>} 

            </div>
        </div>
    );
}

export default MiEdificioComponente;