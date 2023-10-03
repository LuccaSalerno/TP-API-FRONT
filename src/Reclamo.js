import React, { useState } from 'react';
import './Reclamo.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom';




function InicioComponente(){
  
  
  //Hacer un reclamo: Atributos necesarios:
  //- usuario
  //- edificio
  //- ubicacion
  //- descripcion
  //- unidad
  //- imagenes (ver)

  //Se requiere que el ingreso sea mínimo y cerrado. 
  const location = useLocation();
  const persona = location.state && location.state.persona;
  
  const [edificio, setEdificio] = useState({codigo:''});
  var ubicacion;
  var descripcion;
  const [unidad, setUnidad] = useState({codigo:'', piso:'', numero:''});


  const manejarCambioEntrada = (e) => {
    setEdificio({ ...edificio, [e.target.name]: e.target.value });
  };

  const buscarEdificio = async () => {
    try {
      const respuesta = await fetch(`http://localhost:8080/edificios/buscar?codigo=${edificio.codigo}`);
  
      if (respuesta.ok) {
        const edificioEncontrado = await respuesta.json();
        if (edificioEncontrado) {
          console.log('Edificio existe');
          return true; 
        } else {
          console.log('Edificio no existe');
          return false;
        }
      } else {
        console.log('Respuesta no existosa');
        return false; 
      }
    } catch (error) {
      console.log('Error al buscar el edificio o no se encuentra registrado');
      return false; 
    }
  };



  return(
      <div className='PantallaReclamo'>

        <div className='contenedor-datos'>
          <h1 className='bienvenido'>¡Bienvenido/a! {persona.nombre}</h1>

          <form>
            
            <input className='globo' type='number' placeholder="Codigo del Edificio" name="codigo" id='codigo' value={edificio.codigo} onChange={manejarCambioEntrada} required/>
            <input className='globo' />
              
            <button className='globo-boton' type='submit' onClick={() => buscarEdificio()}> Enviar Reclamo </button>
        
          </form>


        </div>
        

      </div>


  )
  

};

export default InicioComponente;