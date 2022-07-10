import React, {Fragment, useContext, useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import {ImagenContext} from '../../context/ImagenContext';
import { spotifySearchCall, getQuerySpotify } from '../../utils';
import Track from '../ListItems/Track';
import axios from 'axios';
import ErrorResult from '../resultado/ErrorResult';
import { v4 as uuidv4 } from 'uuid';

const Canciones = ({mensaje}) => {

    const { base, user, historial, emocion, reco, spotifyTokenResponse, guardarBase } = useContext(ImagenContext);
    //State de resultado
    const [resultado, guardarResultado] = useState([]);
    //State de consulta
    const [consultaApi, guardarConsultaApi] = useState(false);
    //State de error
    const [error, guardarError] = useState(false);
    const [errorCargar, guardarErrorCargar] = useState(false);

    // //Obtener emocion
    useEffect(() => {
        if(reco){
            handleSearch();
        }
        else{
            guardarErrorCargar(true);
        }

    }, []);
    

    //Meter el resultado a la base de datos
    useEffect(() => {
        const enviarDatos = async () =>{
            const url = process.env.REACT_APP_API_BACKEND_URL + '/historial';
            const response = await axios.post(url, base, {
                headers: {
                  'x-api-key': process.env.REACT_APP_API_KEY
                }
              });
            const itemEmotion = {
                id: uuidv4(),
                emocion: emocion
            };
            const url2 = process.env.REACT_APP_API_BACKEND_URL + '/emociones';
            const response2 = await axios.post(url2, itemEmotion, {
                headers: {
                  'x-api-key': process.env.REACT_APP_API_KEY
                }
              });
        }
        if(consultaApi){
            enviarDatos();
        }
    }, [consultaApi]);

    const handleRecarga = ()=>{
        if(reco){
            handleSearch();
        }
        else{
            guardarError(true);
        }
    }

    const handleSearch = async() =>{
        const paramsArray = [
            {
                q: reco
            },
            {
                type: 'track'
            },
            {
                limit: 10
            },
            {
                offset: 10
            }
        ];
        const response = await spotifySearchCall(paramsArray, spotifyTokenResponse.access_token);
        if(response){
            guardarErrorCargar(false);
            let canciones = [];
            response.tracks.items.map((item, index) => {
                let song = {
                    id: item.id,
                    name: item.name,
                    artist: item.artists[0].name,
                    releaseDate: item.album?.release_date,
                    imageUrl: item.album?.images[0]?.url,
                    externalUrl: item.external_urls?.spotify
                };
                canciones.push(song);
            });
            guardarResultado(canciones);

            // //Si el usuario ya tiene historial guardado
            if(historial){
                let nuevo = [];
                historial.map((item) =>{
                    if(!canciones.find(x => x.id === item.id)){
                        nuevo.push(item);
                    }
                });
                let nuevoHistorial = canciones.concat(nuevo);
                //Lo que se almacenará en la base de datos
                guardarBase({
                    email: user.correo,
                    nombre: user.nombre,
                    body: nuevoHistorial
                });
            }
            else{
                //Lo que se almacenará en la base de datos
                guardarBase({
                    email: user.correo,
                    nombre: user.nombre,
                    body: canciones
                });
            }
            guardarConsultaApi(true);
        }
        else{
            guardarError(true);
        }
    }

    return ( 
        <Fragment>
            <div className="container-sm contenedor">
                <div className="row titulo-contenedor">
                    <h1 className="titulo-seccion">{mensaje}</h1>
                </div>
                {
                    emocion
                    ?
                    <div className='row'>
                        <p className='class-Title'>Resultado emocion: {emocion}</p>
                    </div>
                    :
                    null
                }
            </div>
            {
                !error
                ?
                <Fragment>
                    {
                        errorCargar 
                        ?
                        <div className='contenedor center'>
                            <div className='row'>
                                <p className='class-Title'>Error al cargar las canciones</p>
                            </div>
                            <div className='row'>
                            <Button onClick={handleRecarga} variant="contained" size="large">Volver a intentar</Button>
                            </div>
                        </div>
                        :
                        <div className='tracks-container'>
                            <p className='home-tracks-title'>Canciones</p>
                            <div className='tracks-container-item'>
                                {resultado.map((item, index) => <Track key={index} {...item}/>)}
                            </div>
                        </div>
                    }
                </Fragment>
                :
                <ErrorResult mensaje='No se pudo realizar la consulta'/>
            }
        </Fragment>
        );
}
 
export default Canciones;