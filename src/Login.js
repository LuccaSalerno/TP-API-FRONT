import React, { useState } from 'react';
import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from 'react-router-dom';

//Dentro de la función puedo hacer lógica

function LoginComponente(){

    //Control para cambiar de pantalla
    const [Logeado, setLogeado] = useState(false);
    const history = useHistory();

    //Iniciar Sesion
    //Registrarse
    //Persona
    const [persona, crearPersona] = useState({nombre:'', password:'', documento:''});


    //Llama al metodo buscarPersona del PerosnaController es de tipo GET
    const buscarPersona = async () => {
        try {
          const respuesta = await fetch(`http://localhost:8080/personas/buscar?documento=${persona.documento}`);
      
          if (respuesta.ok) {
            const personaEncontrada = await respuesta.json();
            if (personaEncontrada) {
              console.log('La persona existe');
              return true;  // Devuelve true si la persona se encontró
            } else {
              console.log('La persona no existe');
              return false;  // Devuelve false si la persona no se encontró
            }
          } else {
            console.log('NO ESTA');
            return false;  // Devuelve false si hubo un problema con la solicitud
          }
        } catch (error) {
          console.log('Error al buscar la persona o no se encuentra registrado');
          return false;  // Devuelve false si hubo un error en la solicitud
        }
      };
      
    
    //Llama al metodo crearPersona del PersonaController es de tipo POST
    const manejarRegistro = async (e) => {
        try {
            const respuesta = await fetch('http://localhost:8080/personas/crear', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(persona),
            });
            if (respuesta.ok) {
                // Registro exitoso
                console.log('Usuario registrado con éxito');
            } else {
                // Manejar errores de registro
                console.error('Error al registrar usuario');
            }

            } catch (error) {
              console.log('Error de red');
            }
    };

    //Control de lo que se está escribiendo tenga un estado de entrada
    //se crea la persona, "e" es el estado de la persona que tiene valores.
    const manejarCambioEntrada = (e) => {
        crearPersona({ ...persona, [e.target.name]: e.target.value });
    };

    
    //Verifica que al menos que se ingresó algo en el docmuento
    const verificarInputs = () =>{
      //const nombre = document.getElementById('nombre').value;
      //const contrasenia = document.getElementById('password').value;
      const documento = document.getElementById('documento').value;
      if (documento != ''){
        return true
      }
      else{
        return false
      }

    }

    async function Registrar(){
      if (verificarInputs == true){
        const resultadoBusqueda = await buscarPersona();
        console.log(resultadoBusqueda);  // true o false
        if (resultadoBusqueda == false){
            manejarRegistro();
            alert('Registrado con éxito. Puede iniciar sesión')
        }
        else{
            alert('Ya tiene una cuenta existente. Inicie Sesion normalmente')
        }
      }
      else{
        alert('Complete con sus datos')
      } 
    }

    async function IniciarSesion(){
      if (verificarInputs == true){
        const resultadoBusqueda = await buscarPersona();
        console.log(resultadoBusqueda);  // true o false
        if (resultadoBusqueda == true){
            alert('Entraste a la plataforma')
            setLogeado(true);
            //Puede cambiar a la siguiente pantalla
            //setLogeado(true);
            //Redirigo al usuario a la sigueinte pantalla
            history.push('/inicio');
         }
         else{
            alert('No existe el usuario. Registrese')
         }
      }
      else{
        alert('Ingrese algo')
      }
        
      
        
    }

        
    return(

        <div className='Login'>
            
            <div className='contenedor-datos'>
                <h1 className='bienvenido'>¡Bienvenido/a!</h1>

              <form>
                <input className='globo' type="text" placeholder="Nombre" name="nombre" id='nombre' value={persona.nombre} onChange={manejarCambioEntrada} required/>
                <input className='globo' type="password" placeholder="Contraseña" name="password" id='password' value={persona.password} onChange={manejarCambioEntrada} required/>
                <input className='globo' type="text" placeholder="Documento" name="documento" id='documento' value={persona.documento} onChange={manejarCambioEntrada} required/>
                <button className='globo-boton' onClick={IniciarSesion}>Iniciar Sesion </button>
                <button className='globo-boton' onClick={Registrar}>Registrarse</button>
              </form>
                
                
                
            </div>
            
        </div>
    );
}


export default LoginComponente;