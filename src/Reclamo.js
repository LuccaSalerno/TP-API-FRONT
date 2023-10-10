import React, { useState } from 'react';
import './Reclamo.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom';
//import { useNavigate } from 'react-router-dom';




function ReclamoComponente(){

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
  const [usuario, setUsuario] = useState({documento:persona.documento});
  const [edificio, setEdificio] = useState({codigo:'0'});
  const [unidad, setUnidad] = useState({piso:'', numero:''}); 
  //ver lo de imagenes
  const [reclamo, setReclamo] = useState({usuario:usuario, edificio:edificio, ubicacion:'', descripcion:'', unidad:unidad, estado:'nuevo'});


//Manejadores de entrada
const manejarCambioEntradaPersona= (e) => {
  const u = { ...usuario, [e.target.name]: e.target.value.toString() };
  setUsuario(u);
  setReclamo({ ...reclamo, usuario:u });
};

const manejarCambioEntradaEdificio = (e) => {
    const ed = { ...edificio, [e.target.name]: e.target.value };
    setEdificio(ed);
    setReclamo({ ...reclamo, edificio:ed})


    //setUnidad((prevUnidad) => ({ ...prevUnidad, [e.target.name]: valorCodigoUnidad }));
};

const manejarCambioEntradaUnidad = (e) => {
  // Convertir el valor a cadena antes de actualizar el estado
  const nuevoValor = e.target.value.toString();

  // Actualizar el estado de la unidad
  setUnidad((prevUnidad) => ({ ...prevUnidad, [e.target.name]: nuevoValor }));

//const valorReclamoUnidad = e.target.name === "codigo" ? parseInt(nuevoValor) : nuevoValor;

  // Actualizar el objeto reclamo con el estado más reciente de la unidad
  setReclamo((prevReclamo) => ({...prevReclamo, unidad: { ...prevReclamo.unidad, [e.target.name]: nuevoValor }}));
};

const manejarCambioEntradaReclamo = (e) => {
  setReclamo({ ...reclamo, [e.target.name]: e.target.value });
};


//buscadores de la entidad existente
  const buscarEdificio = async () => {
    try {
      const respuesta = await fetch(`http://localhost:8080/api/edificios/buscar?codigo=${edificio.codigo}`);
  
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

  const buscarUnidad = async () => {
    try {
      //console.log( typeof parseInt(edificio.codigo), typeof unidad.piso, typeof unidad.numero, edificio.codigo);
      const respuesta = await fetch(`http://localhost:8080/api/unidades/buscar?codigo=${(edificio.codigo)}&piso=${unidad.piso}&numero=${unidad.numero}`);
      
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
            alert('Reclamo agregado con exito');
        } else {
            alert('Parece que no tiene los permisos necesarios.');
        }
        } catch (error) {
          alert('Error de red');
        }
};


//agregar el reclamo
async function reclamar(reclamo){
  console.log(reclamo)
  try {
    const resultadoBusquedaEdificio = await buscarEdificio();
    const resultadoBusquedaUnidad = await buscarUnidad();

    console.log(resultadoBusquedaEdificio, resultadoBusquedaUnidad);

    if (resultadoBusquedaEdificio && resultadoBusquedaUnidad) {
      await agregarReclamo(reclamo);
    } else {
      alert('El edificio o unidad ingresado no existen.');
    }
  } catch (error) {
      alert('Ocurrió un error al procesar el reclamo o parece que no tiene los permisos necesarios.');
  }
};


function enviarFormulario(e) {
  // Evitar la recarga de la página
  e.preventDefault();

  // Lógica para procesar el formulario
  console.log("Formulario enviado, pero la página no se recargará");
}



//SOBRE IMAGENES
const [imagenes, setImagenes] = useState([]);

  const mostrarImagenes = (event) => {
    const nuevosArchivos = Array.from(event.target.files);

    setImagenes([...imagenes, ...nuevosArchivos]);
  };

  const eliminarImagen = (index) => {
    const nuevasImagenes = [...imagenes];
    nuevasImagenes.splice(index, 1);
    setImagenes(nuevasImagenes);
  };


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

        <p>Sólo puede hacer el reclamo si es propietario o inquilino de la unidad.</p>

        <h1 className='bienvenido'>¡Haz tu reclamo!</h1>
        <div className='contenedor-datos'>

        <form onSubmit={enviarFormulario}>
            <input className='input-lectura' type='text' placeholder="Documento" name="documento" id='documento' value={usuario.documento} onChange={manejarCambioEntradaPersona} readOnly/>
            <input className='globo' type='text' placeholder="Codigo del Edificio" name="codigo" id='codigo' value={edificio.codigo === '0' ? '' : edificio.codigo} onChange={manejarCambioEntradaEdificio} required/>
            <input className='globo' type='text' placeholder='Ubicacion' name='ubicacion' id='ubicacion' value={reclamo.ubicacion} onChange={manejarCambioEntradaReclamo}  required/>

            
            <input className='globo' type='text' placeholder='Piso' name='piso' id='piso' value={unidad.piso} onChange={manejarCambioEntradaUnidad} required/>
            <input className='globo' type='text' placeholder='Número' name='numero' id='numero' value={unidad.numero} onChange={manejarCambioEntradaUnidad} required/>

            <textarea className='globo' type='text' placeholder='Descripción' name='descripcion' id='descripcion' value={reclamo.descripcion} maxLength='1000' onChange={manejarCambioEntradaReclamo}  required></textarea>
            <p className='contador-caracteres'>1000 caracteres</p>

            <input type="file" id="imagenes" name="imagenes" multiple onChange={mostrarImagenes}/>
            <div id="contenedor-imagenes">
            {imagenes.map((imagen, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <img
                  src={URL.createObjectURL(imagen)}
                  style={{ width: '100px', marginLeft:'50px', marginTop:'20px' }}
                  alt={`Imagen ${index}`}
                />
                <button style={{ width: '100px', marginLeft:'50px', marginTop:'20px' }} onClick={() => eliminarImagen(index)}>Eliminar</button>
              </div>
            ))}
          </div>


            <button className='globo-boton' type='submit' onClick={ () => { reclamar(reclamo) }}> Enviar Reclamo </button>
        
          </form>


        </div>
        
    </div>
  </div>


  )
  

};

export default ReclamoComponente;