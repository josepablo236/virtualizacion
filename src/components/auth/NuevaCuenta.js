import React, {useState, useEffect, Fragment} from 'react';
import {Link} from 'react-router-dom';
import Error from '../Error.js';
import axios from 'axios';

const NuevaCuenta = () => {

    //State de crear cuenta
    const [usuario, guardarUsuario] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmar: ''
    })

    //State del usuario creado
    const [creado, guardarCreado] = useState({
        nombre: '',
        email: '',
        password: ''
    })

    //State mensaje error
    const [mensaje, guardarMensaje] = useState("");

    //State consulta
    const [consultar, guardarConsulta] = useState(false);

    //State para error
    const [error, guardarError] = useState(false);

    //State satisfactorio
    const [exito, guardarExito] = useState(false);

    const onChange= e =>{
        guardarUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }

    const crearCuenta = e =>{
        e.preventDefault();

        guardarError(false);
        //Validar campos vacios
        if(nombre.trim() === '' || email.trim() === '' || password.trim() === '' || confirmar.trim() === '')
        {
            guardarMensaje("Todos los campos son obligatorios");
            guardarError(true);
            return;
        }
        //Validar contraseñas iguales
        if(password !== confirmar)
        {
            guardarMensaje("Las contraseñas no coinciden");
            guardarError(true);
            return;
        }
        //Validar tamaño de contraseña
        if(password.length < 5)
        {
            guardarMensaje("La contraseña es demasiado corta");
            guardarError(true);
            return;
        }
        guardarError(false);

        var CryptoJS = require("crypto-js");
 
        // Encrypt
        var ciphertext = CryptoJS.AES.encrypt(password, 'secret key 123').toString();
        guardarCreado({
            nombre: nombre,
            email: email,
            password: ciphertext
        });
        guardarConsulta(true);
        
    }

    const {nombre, email, password, confirmar} = usuario;

    //Llamado a la API
    useEffect(() => {
        const consultarAPI = async () =>{
            const url = process.env.REACT_APP_API_BACKEND_URL + '/users';
            axios.post(url, creado, {
                headers: {
                  'x-api-key': process.env.REACT_APP_API_KEY
                }
              })
            .then(response =>{
                if(response.status === 200)
                {
                    guardarExito(true);
                }
                else{
                    guardarMensaje("Error al crear cuenta");
                    guardarError(true);
                    guardarConsulta(false);
                }
            });
        }
        if(consultar){
            consultarAPI();
        }
    }, [consultar])

    return ( 
        <Fragment>
            {
                !exito 
                ?
                <div className="center mt-5">
                    <div className="contenedor-form sombra-dark">
                        <h1 className='text-center mb-3'>Crear Cuenta</h1>
                        {error ? <Error mensaje={mensaje}/> : null}
                        <form
                            onSubmit={crearCuenta}
                        >
                            <div className="campo-form">
                                <label htmlFor="email">Nombre</label>
                                <input
                                    type="text"
                                    id="nombre"
                                    name="nombre"
                                    placeholder="Ingresa tu nombre"
                                    onChange={onChange}
                                    value={nombre}
                                />
                            </div>
                            <div className="campo-form">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Ingresa tu email"
                                    onChange={onChange}
                                    value={email}
                                />
                            </div>
                            <div className="campo-form">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Ingresa tu password"
                                    onChange={onChange}
                                    value={password}
                                />
                            </div>
                            <div className="campo-form">
                                <label htmlFor="confirmar">Confirmar Password</label>
                                <input
                                    type="password"
                                    id="confirmar"
                                    name="confirmar"
                                    placeholder="Repite tu password"
                                    onChange={onChange}
                                    value={confirmar}
                                />
                            </div>
                            
                            <div className="campo-form">
                                <input type="submit" className="btn btn-primario btn-block"
                                    value="Registrarme"/>
                            </div>
                        </form>
                        <Link to={'/login'} className="enlace-cuenta"> Volver a iniciar sesión </Link>
                    </div>
                </div>
                :
                <div className="center mt-5">
                    <div className="contenedor-form sombra-dark">
                        <h1>Cuenta Creada Exitosamente</h1>
                        <p>Por favor inicia sesión</p>
                        <Link to={'/login'} className="enlace-cuenta"> Iniciar sesión </Link>
                    </div>
                </div>
            }
        
        </Fragment>
     );
}
 
export default NuevaCuenta;