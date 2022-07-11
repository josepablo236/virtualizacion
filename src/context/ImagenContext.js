import React, {createContext, useState, useEffect} from 'react';
import { recognitionCall, getQuerySpotify } from '../utils';

//Crear context
export const ImagenContext = createContext();

//Provider para funciones y state
const ImagenProvider = (props) =>{
    //State autenticacion
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    //State Token
    const [spotifyTokenResponse, setSpotifyTokenResponse] = useState();
    //State Refresh Token
    const [spotifyRefreshToken, setSpotifyRefreshToken] = useState();
    //State cargar API
    const [cargar, guardarCargar] = useState(false);
    //State del usuario admin
    const [isAdmin, guardarIsAdmin] = useState(false);
    //State usuario
    const [user, guardarUser] = useState({});
    //State de la imagen
    const [foto, guardarFoto] = useState({});
    //State nombre de la imagen
    const [nombre, guardarNombre] = useState('');
    //State de consulta resultado
    const [consultarSpotify, guardarConsultarSpotify] = useState(false);
    //Necesito: login, retro, resultado
    const [base, guardarBase] = useState({});
    //State para historial
    const [historial, guardarHistorial] = useState([]);
    //Para volver a pagina principal
    const [regresar, guardarRegresar] = useState(false);
    //State de la emocion
    const [emocion, guardarEmocion] = useState('');
    //State de la recomendacion
    const [reco, guardarReco] = useState('');
    //States de errores
    //State error imagen
    const [errorfoto, guardarErrorfoto] = useState(false);

    //Para regresar
    useEffect(()=>{
        if(regresar){
            setIsAuthenticated(true);
        }
    },[regresar]);

    //Consulta a lambda
    useEffect(() => {
        if(cargar){
            const obtenerInfo = async() =>{
                var data = await recognitionCall(foto)
                .then(data => {
                    if(data.statusCode === 200){
                        var body = data.file_path;
                        var respuesta = getQuerySpotify(body);
                        var array = respuesta.split('|');
                        guardarEmocion(array[0]);
                        guardarReco(array[1]);
                        guardarConsultarSpotify(true);
                        guardarErrorfoto(false);
                    }
                    else{
                        guardarErrorfoto(true);
                    }
                });
            }
            obtenerInfo();
        }
    }, [foto]);

    return(
        <ImagenContext.Provider
            value={{
                isAuthenticated,
                spotifyTokenResponse,
                spotifyRefreshToken,
                user,
                foto,
                cargar,
                nombre,
                errorfoto,
                consultarSpotify,
                base,
                historial,
                emocion,
                reco,
                isAdmin,
                guardarIsAdmin,
                setIsAuthenticated,
                setSpotifyTokenResponse,
                setSpotifyRefreshToken,
                guardarUser,
                guardarFoto,
                guardarCargar,
                guardarNombre,
                guardarErrorfoto,
                guardarRegresar,
                guardarConsultarSpotify,
                guardarHistorial,
                guardarBase,
                guardarReco,
                guardarEmocion
            }}
        >
            {props.children}
        </ImagenContext.Provider>
    )
}
export default ImagenProvider;