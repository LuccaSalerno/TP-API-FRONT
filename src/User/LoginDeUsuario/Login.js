import React, { useState } from 'react';
import './Login.css';
import imagenAdmin from '../../recursos/adm.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

//Dentro de la función puedo hacer lógica


//Iniciar Sesion
function LoginComponente(){
  const navigate = useNavigate();

    //Control para cambiar de pantalla
    const [logeado, setLogeado] = useState(false);

    //Persona
    const [persona, setPersona] = useState({documento:'', password:''});

    //Guarda a la persona con sus datos
    const manejarCambioEntrada = (e) => {
          setPersona({ ...persona, [e.target.name]: e.target.value });
      };

  
      const login = async () => {
        try {
          const respuesta = await fetch('http://localhost:8080/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(
              persona
            ),
          });
          if (respuesta.ok) {
            console.log('Usuario se loggeó con éxito');
            //Permiso para poder ir a la siguiente pantalla
            setLogeado(true);
            return true;
          } else {
            console.error('Error al loggearse');
            return false;
          }
        } catch (error) {
          console.log('Error de red', error);
          return false;
        }
      };

    //Verifica que al menos que se ingresó algo en el "docmuento"
    const verificarInputs = () =>{
      const documento = document.getElementById('documento').value;
      if (documento !== ''){
        return true
      }
      else{
        return false
      }
    }

    async function IniciarSesion(){
        if (verificarInputs() === true){
            const resultadoBusqueda = await login();
            console.log(resultadoBusqueda);  // true o false
            if (resultadoBusqueda === true){
                alert("Entraste a la plataforma")
                navigate('/home', { state: { persona: persona } });
             }
             else{
                alert('No existe el usuario')
             }
        }
        else{
            alert('Complete con sus datos')
        }    
    }


    function IngresarAdmin(){
      console.log("askdnkas")
      navigate('/login-administrador');
    }
        
    return(
        <div className='Login'>
          {!logeado ? (
            //Usuario no autenticado, muestro el formulario Login
            <div className='contenedor-datos'>
              <h1 className='bienvenido'>¡Bienvenido/a!</h1>
                <form>
                  <input className='globo' type="text" placeholder="Documento" name="documento" id='documento' value={persona.documento} onChange={manejarCambioEntrada} required/>
                  <input className='globo' type="password" placeholder="Contraseña" name="password" id='password' value={persona.password} onChange={manejarCambioEntrada} required/>
                  <button className='globo-boton' type='button' onClick={() => IniciarSesion()}>Iniciar Sesion </button>
                </form>
                <img className="imagenRol" src={imagenAdmin} alt="ingresar admin" onClick={IngresarAdmin} title="Ingresar Administración"></img>

            </div>
          ) : (

            null
            
          )};  
        </div>
    );
}


export default LoginComponente;