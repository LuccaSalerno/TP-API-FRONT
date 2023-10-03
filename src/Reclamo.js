import React, { useState } from 'react';
import './Reclamo.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory} from 'react-router-dom';
import { Redirect } from 'react-router-dom';



function InicioComponente(props){

  const persona = props.location.state.persona;


  const history = useHistory();

  const [edificio, crearEdificio] = useState({codigo:''});

  const manejarCambioEntrada = (e) => {
    crearEdificio({ ...edificio, [e.target.name]: e.target.value });
  };

  const buscarEdificio = async () => {
    try {
      const respuesta = await fetch(`http://localhost:8080/edificios/buscar?codigo=${edificio.codigo}`);
  
      if (respuesta.ok) {
        const edificioEncontrado = await respuesta.json();
        if (edificioEncontrado) {
          console.log('Edificio existe');
          return true;  // Devuelve true si la persona se encontró
        } else {
          console.log('Edificio no existe');
          return false;  // Devuelve false si la persona no se encontró
        }
      } else {
        console.log('NO ESTA');
        return false;  // Devuelve false si hubo un problema con la solicitud
      }
    } catch (error) {
      console.log('Error al buscar el edificio o no se encuentra registrado');
      return false;  // Devuelve false si hubo un error en la solicitud
    }
  };


  return(
      <div className='PantallaReclamo'>

        <div className='contenedor-datos'>
          <h1 className='bienvenido'>¡Bienvenido/a! {persona.nombre}</h1>

          <form>
            
            <input className='globo' type='number' placeholder="Codigo del Edificio" name="codigo" id='codigo' value={edificio.codigo} onChange={manejarCambioEntrada} required/>
                
            <button className='globo-boton' type='submit' onClick={() => buscarEdificio()}> Enviar Reclamo </button>
        
          </form>


        </div>
        

      </div>


  )
};

export default InicioComponente;