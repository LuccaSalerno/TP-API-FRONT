import React, { useState } from 'react';
import './Inicio.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from 'react-router-dom';



function InicioComponente(){
  const history = useHistory();

  const [edificio, crearPersona] = useState({codigo:''});

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
      <h1>ESTA ES LA PANTALLA DE INCIO</h1>

  )
};

export default InicioComponente;