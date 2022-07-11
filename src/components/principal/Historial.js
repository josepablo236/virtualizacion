import React, {Fragment, useContext, useEffect} from 'react';
import {ImagenContext} from '../../context/ImagenContext';
import Track from '../ListItems/Track';
import axios from 'axios';

const Historial = () => {

    const { user, historial, isAuthenticated, guardarHistorial } = useContext(ImagenContext);
    

    //Traer las canciones de la base de datos
    useEffect(() => {
        const consultarDatos = async () =>{
            const url = process.env.REACT_APP_API_BACKEND_URL + `/historial?email=${user.correo}`;
            const response = await axios.get(url,{
                headers: {
                  'x-api-key': process.env.REACT_APP_API_KEY
                }
              });
            guardarHistorial(response.data.body);
        }
        if(isAuthenticated){
            consultarDatos();
        }
    }, []);

    return ( 
        <Fragment>
            <div className="container-sm contenedor mt-3">
                <div className="row titulo-contenedor">
                    <h1 className="titulo-seccion">Historial de canciones:</h1>
                </div>
            </div>
            {
                historial
                ?
                    <div className='historial-container mb-5'>
                        <div className='historial-container-item row'>
                            {historial.map((item, index) => <div className='col-md-4 col-lg-3 center' key={index}><Track {...item}/></div>)}
                        </div>
                    </div>
                :
                <h2 className='class-Title center mb-5'>No tienes un historial de canciones, sube una foto para buscar.</h2>
            }
            
        </Fragment>
     );
}
 
export default Historial;