import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState} from 'react';

function Unidad(){

    const [inquilinos, setInquilinos] = useState([{"documento": "123456", "nombre": "Juan Perez"}, {"documento": "5555", "nombre": "Lionel Messi"}]);
    const [propietarios, setPropietarios] = useState([{"documento": "66666", "nombre": "The Punisher"}, {"documento": "11111", "nombre": "Duki"}]);
    const [personas, setPersonas] = useState([{"documento": "66666", "nombre": "The Punisher"}, {"documento": "11111", "nombre": "Duki"}, {"documento": "123456", "nombre": "Juan Perez"}, {"documento": "5555", "nombre": "Lionel Messi"}, {"documento": "123456", "nombre": "Juan Perez"}, {"documento": "5555", "nombre": "Andres"}]);

    const [form , setForm] = useState({
        nombre: '',
        direccion: ''
    });

    const manejoDatos = (e) => {
        const { name , value } = e.target;
        setForm(
            {
                ...form, 
                [name]: value,
            }
        );
    };

    const eliminarBoton = (e, id) => {
        e.preventDefault();

    }

    const crearBoton = (e) => {
        e.preventDefault();

    }

    const unidadesBoton = (e, id) => {
        e.preventDefault();

    }

    const eliminarInquilinoBoton= (e, id) => {
        e.preventDefault();

    }

    const eliminarPropietarioBoton= (e, id) => {
        e.preventDefault();

    }

    const agregarInquilino = (e, id) => {
        e.preventDefault();

    }

    const agregarPropietario = (e, id) => {
        e.preventDefault();

    }

    return(
        <div>
        <h1 className="text-center my-3 pb-3">Unidad</h1>

            <div class="container">
                <div class="row">
                    <div class="col-6">
                        <button type="submit" className="btn btn-primary w-100" onClick={ (e) => {}}>Liberar</button>
                    </div>
                    <div class="col-6">
                        <button type="submit" className="btn btn btn-secondary w-100" onClick={ (e) => {} }>Habitar</button>
                    </div>
                </div>
            </div>


        
        <section>



            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col col-lg-12 col-xl-8">
                    <div className="card rounded-3">
                    <div className="card-body p-">

                        <h2 className="text-center my-3 pb-3">Inquilinos</h2>


                        <table className="table mb-3">
                        <thead>
                            <tr>
                            <th scope="col">DNI</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>

                            {inquilinos.map((inquilino) => (
                                <tr>
                                    <th scope="row">{inquilino.documento}</th>
                                    <td>{inquilino.nombre}</td>
                                    <td>
                                        <button type="submit" className="btn btn-danger" onClick={ (e) => eliminarInquilinoBoton(e, inquilino.documento) }>Eliminar</button>
                                        <button type="submit" className="btn btn btn-primary ms-1" onClick={ (e) => unidadesBoton(e, inquilino.documento) }>Ver Persona</button>
                                    </td>
                                </tr>
                            ))}

                            <tr>        
                                    <th scope="row">#</th>
                                    <td>
                                    <select class="form-control" id="exampleFormControlSelect1">
                                        {personas.map((persona) => (
                                            <option>{persona.nombre}, {persona.documento}</option>
                                        ))}
                                        
                                    </select>
                                    </td>

                                    <td>
                                        <button type="submit" className="btn btn-success ms-1" onClick={agregarInquilino}>Agregar</button>
                                    </td>
                                </tr>
                
                        </tbody>
                        </table>

                    </div>
                    </div>
                </div>
                </div>
            </div>
        </section>
        

        <section>



            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col col-lg-12 col-xl-8">
                    <div className="card rounded-3">
                    <div className="card-body p-">

                        <h2 className="text-center my-3 pb-3">Propietarios</h2>


                        <table className="table mb-3">
                        <thead>
                            <tr>
                            <th scope="col">DNI</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>

                            {propietarios.map((propietario) => (
                                <tr>
                                    <th scope="row">{propietario.documento}</th>
                                    <td>{propietario.nombre}</td>
                                    <td>
                                        <button type="submit" className="btn btn-danger" onClick={ (e) => eliminarPropietarioBoton(e, propietario.documento) }>Eliminar</button>
                                        <button type="submit" className="btn btn btn-primary ms-1" onClick={ (e) => unidadesBoton(e, propietario.documento) }>Ver Persona</button>
                                    </td>
                                </tr>
                            ))}

                            <tr>        
                                    <th scope="row">#</th>
                                    <td>
                                    <select class="form-control" id="exampleFormControlSelect1">
                                        {personas.map((persona) => (
                                            <option>{persona.nombre}, {persona.documento}</option>
                                        ))}
                                        
                                    </select>
                                    </td>

                                    <td>
                                        <button type="submit" className="btn btn-success ms-1" onClick={agregarPropietario}>Agregar</button>
                                    </td>
                                </tr>
                
                        </tbody>
                        </table>

                    </div>
                    </div>
                </div>
                </div>
            </div>
        </section>
        </div>
        
    )
};

export default Unidad;