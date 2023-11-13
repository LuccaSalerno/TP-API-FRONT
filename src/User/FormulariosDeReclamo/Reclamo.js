import React, { useState } from 'react';
import './Reclamo.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import NavBarComponente from '../navbar/navbar';




function ReclamoComponente(){

  const navigate = useNavigate();
  
  //Se requiere que el ingreso sea mínimo y cerrado. 
  const location = useLocation();

  const usuario = location.state && location.state.usuario;

  const [unidad, setUnidad] = useState({piso:'', numero:'', codigoEdificio:'0'})
  //ver lo de imagenes
  const [reclamo, setReclamo] = useState({documento:'', codigoEdificio:'0', ubicacion:'', descripcion:'', unidad:unidad, estado:'nuevo'});



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

  


  //agregar el reclamo
  const agregarReclamo = async (reclamo) => {
    console.log(reclamo)
    try {
        console.log("ENTRO")
        const respuesta = await fetch('http://localhost:8080/reclamos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify((
            reclamo
          )),

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


/*
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
*/


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
      <NavBarComponente/>

      <div className='cuerpo'>

        <p>Sólo puede hacer el reclamo si es propietario del edificio o inquilino de la unidad.</p>

        <h1 className='bienvenido'>¡Haz tu reclamo!</h1>
        <div className='contenedor-datos'>

        <form onSubmit={enviarFormulario}>
            <input className='input-lectura' type='text' placeholder="Documento" name="documento" id='documento' value={usuario.documento} onChange={manejarCambioEntradaReclamo} readOnly/>
            <input className='globo' type='text' placeholder="Codigo del Edificio" name="codigoEdificio" id='codigo' value={reclamo.codigoEdificio === '0' ? '' : reclamo.codigoEdificio } onChange={manejarCambioEntradaUnidad} required/>
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


            <button className='globo-boton' type='submit' onClick={ () => { agregarReclamo(reclamo) }}> Enviar Reclamo </button>
        
          </form>


        </div>
        
    </div>
  </div>


  )
  

};

export default ReclamoComponente;