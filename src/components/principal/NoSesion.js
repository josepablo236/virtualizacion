import React, {Fragment, useEffect, useContext, useCallback, useState} from 'react';
import Button from '@material-ui/core/Button';
import Lock from '@material-ui/icons/LockOpen';
import { useHistory, useLocation, Link } from 'react-router-dom';
import {ImagenContext} from '../../context/ImagenContext';
import { spotifyAuthCall } from '../../utils';

const spotifyUrl = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_SPOTIFY_CALLBACK_HOST}&scope=user-read-private`;

const NoSesion = () => {

    //State de la auth que viene desde el context
    const { spotifyRefreshToken, setSpotifyRefreshToken, setSpotifyTokenResponse, setIsAuthenticated } = useContext(ImagenContext);

    //State para spinner
    const [cargando, guardarCargando] = useState(false);

    const location = useLocation();
    const history = useHistory();

    //Login Spotify
    const authenticateUser = useCallback(async(code)=> {
        try {
            let response; 

            //Si el refresh token no existe, solicita un token
            response = await spotifyAuthCall({ grant_type: 'client_credentials' });

            if(response.access_token){
                setSpotifyRefreshToken(response?.refresh_token);
                setSpotifyTokenResponse(response);
                setIsAuthenticated(true);
            }
            else{
                throw new Error("Usuario no fue logueado");
            }
        } catch (error) {
            alert("Usuario no fue logueado en spotify");
            setSpotifyTokenResponse(null);
            setSpotifyRefreshToken(null);
            setIsAuthenticated(false);
        }
    },[setSpotifyRefreshToken, setSpotifyTokenResponse, setIsAuthenticated, spotifyRefreshToken]);


    //Al hacer click en iniciar sesion
    const handleLogin = async()=>{
        let response; 

        //Si el refresh token existe, haz una llamada a refresh token, de lo contrario solicita un token
        if(spotifyRefreshToken){
            //Llamada
            response = await spotifyAuthCall({refresh_token: spotifyRefreshToken, grant_type: 'refresh_token'});
        }
        else{
            response = await spotifyAuthCall({grant_type: 'client_credentials'});
        }

        if(response.access_token){
            setSpotifyRefreshToken(response?.refresh_token);
            setSpotifyTokenResponse(response);
            setIsAuthenticated(true);
        }
        else{
            throw new Error("Credenciales incorrectas en spotify app");
        }
    }

    return ( 
        <Fragment>
            {
                cargando
                ?
                <div className="d-flex justify-content-center center mt-5">
                    <div className="spinner-border" style={{width: '5rem', height: '5rem'}} role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
                :
                <Fragment>
                    <p className="subtitulo">Haz click aqui para iniciar sesión:</p>
                    <Link to="/login">
                        <Button onClick={handleLogin} variant="contained" size="large" startIcon={<Lock/>}>Iniciar sesión</Button>
                    </Link>
                </Fragment>
            }
        </Fragment>
     );
}
 
export default NoSesion;