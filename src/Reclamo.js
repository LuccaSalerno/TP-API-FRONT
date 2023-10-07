import React, { useState } from 'react';
import './Reclamo.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom';
//import { useNavigate } from 'react-router-dom';




function InicioComponente(){

  //const navigate = useNavigate();
  
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

  const [usuario, setUsuario] = useState({documento:''});

  
  const [edificio, setEdificio] = useState({codigo:'0'});
  
  const [unidad, setUnidad] = useState({piso:'', numero:'', id:'0'}); 

  //ver lo del estado y lo de imagenes
  const [reclamo, setReclamo] = useState({usuario:usuario, edificio:edificio, ubicacion:'', descripcion:'', unidad:unidad, estado:'nuevo'});


const manejarCambioEntradaPersona= (e) => {
  //const nuevoValor = e.target.value.toString();
  const u = { ...usuario, [e.target.name]: e.target.value.toString() };
  setUsuario(u);
  setReclamo({ ...reclamo, usuario:u });

};

const manejarCambioEntradaEdificio = (e) => {
    const ed = { ...edificio, [e.target.name]: e.target.value };
    setEdificio(ed);
    setReclamo({ ...reclamo, edificio:ed})
};

  //ver si existe el edificio
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


const manejarCambioEntradaUnidad = (e) => {
  // Convertir el valor a cadena antes de actualizar el estado
  const nuevoValor = e.target.value.toString();

  // Actualizar el estado de la unidad
  setUnidad((prevUnidad) => ({ ...prevUnidad, [e.target.name]: nuevoValor }));

  const valorReclamoUnidad = e.target.name === "id" ? parseInt(nuevoValor) : nuevoValor;

  // Actualizar el objeto reclamo con el estado más reciente de la unidad
  setReclamo((prevReclamo) => ({
    ...prevReclamo,
    unidad: { ...prevReclamo.unidad, [e.target.name]: valorReclamoUnidad },
  }));


};



  //ver si existe la unidad
  const buscarUnidad = async () => {
    try {
      //console.log( typeof parseInt(edificio.codigo), typeof unidad.piso, typeof unidad.numero);
      const respuesta = await fetch(`http://localhost:8080/api/unidades/buscar?codigo=${(unidad.id)}&piso=${unidad.piso}&numero=${unidad.numero}`);
      
      if (respuesta.ok) {
        const unidadEncontrada = await respuesta.json();
        if (unidadEncontrada) {
          console.log('Unidad existe');
          return true; 
        } else {
          console.log('Unidad no existe');
          return false;
        }
      } else {
        console.log('Respuesta no existosa');
        return false; 
      }
    } catch (error) {
      console.log('Error al buscar el unidad o no se encuentra registrado');
      return false; 
    }
  };

  
  const manejarCambioEntradaReclamo = (e) => {
    setReclamo({ ...reclamo, [e.target.name]: e.target.value });
  };

  //agregar el reclamo
  const agregarReclamo = async (reclamo) => {
    try {
        console.log("ENTRO")
        const respuesta = await fetch('http://localhost:8080/api/reclamos/agregar', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            reclamo
        ),

        });
        if (respuesta.ok) {
            console.log('Reclamo agregado con exito');
        } else {
            console.error('Error al agregar reclamo');
        }
        } catch (error) {
          console.log('Error de red');
        }
};

async function reclamar(reclamo){
  console.log(reclamo)

  try {
    const resultadoBusquedaEdificio = await buscarEdificio();
    const resultadoBusquedaUnidad = await buscarUnidad();

    console.log(resultadoBusquedaEdificio, resultadoBusquedaUnidad);

    if (resultadoBusquedaEdificio && resultadoBusquedaUnidad) {
      await agregarReclamo(reclamo);
    } else {
      alert('No se pudo agregar el reclamo.');
    }
  } catch (error) {
    console.error('Error al reclamar:', error);
    alert('Ocurrió un error al procesar el reclamo.');
  }
};


function enviarFormulario(e) {
  // Evitar la recarga de la página
  e.preventDefault();

  // Lógica para procesar el formulario
  console.log("Formulario enviado, pero la página no se recargará");
}


  return(
    <div className='PantallaReclamo'>
      <header>
        <nav>
          <ul>
            <li><a href="https://www.google.com.ar/">Inicio</a></li>
            <li><a href="https://www.google.com.ar/">Hacer Reclamo</a></li>
            <li><a href="https://www.google.com.ar/">Ver Reclamos</a></li>
          </ul>
        </nav>
      </header>

      <div className='cuerpo'>
      

        <h1 className='bienvenido'>¡Haz tu reclamo {persona.nombre}!</h1>
        <div className='contenedor-datos'>

        <form onSubmit={enviarFormulario}>
            <input className='globo' type='text' placeholder="Documento" name="documento" id='documento' value={usuario.documento} onChange={manejarCambioEntradaPersona} required/>
            <input className='globo' type='text' placeholder="Codigo del Edificio" name="codigo" id='codigo' value={edificio.codigo === '0' ? '' : edificio.codigo} onChange={manejarCambioEntradaEdificio} required/>
            <input className='globo' type='text' placeholder='Ubicacion' name='ubicacion' id='ubicacion' value={reclamo.ubicacion} onChange={manejarCambioEntradaReclamo}  required/>
            <textarea className='globo' type='text' placeholder='Descripción' name='descripcion' id='descripcion' value={reclamo.descripcion} maxLength='1000' onChange={manejarCambioEntradaReclamo}  required></textarea>
            <p className='contador-caracteres'>1000 caracteres</p>

            
            <input className='globo' type='text' placeholder='Piso' name='piso' id='piso' value={unidad.piso} onChange={manejarCambioEntradaUnidad} required/>
            <input className='globo' type='text' placeholder='Número' name='numero' id='numero' value={unidad.numero} onChange={manejarCambioEntradaUnidad} required/>
            <input className='globo' type='text' placeholder='Identificador de la unidad' name='id' id='id' value={unidad.id === '0' ? '' : unidad.id}  onChange={manejarCambioEntradaUnidad} required/>

            <button className='globo-boton' type='submit' onClick={ () => { reclamar(reclamo) }}> Enviar Reclamo </button>
        
          </form>


        </div>
        
    </div>
  </div>


  )
  

};

export default InicioComponente;