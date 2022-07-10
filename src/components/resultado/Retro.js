import React, {Fragment, useState, useContext, useEffect} from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Like from '@material-ui/icons/ThumbUp';
import Medium from '@material-ui/icons/ThumbsUpDown';
import Dislike from '@material-ui/icons/ThumbDown';
import {ImagenContext} from '../../context/ImagenContext';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const Retro = () => {

    //State de la imagen que viene desde el context
    const { user, errorFoto } = useContext(ImagenContext);

    //State para mensaje
    const [mensaje, guardarMensaje] = useState(false);
    //State para base de datos
    const [base, guardarBase] = useState(false);

    const like = ()=>{
        //Lo que se almacenará en la base de datos
        guardarBase({
            id: uuidv4(),
            email: user.correo,
            nombre: user.nombre,
            retro: 'Like'
        });
        guardarMensaje(true);
    }
    const medium = ()=>{
        guardarBase({
            id: uuidv4(),
            email: user.correo,
            nombre: user.nombre,
            retro: 'Medium'
        });
        guardarMensaje(true);
    }
    const dislike = ()=>{
        //Lo que se almacenará en la base de datos
        guardarBase({
            id: uuidv4(),
            email: user.correo,
            nombre: user.nombre,
            retro: 'Dislike'
        });
        guardarMensaje(true);
    }

    //Meter el resultado a la base de datos
    useEffect(() => {
        const enviarDatos = async () =>{
            const url ='https://15hahfb4hc.execute-api.us-east-2.amazonaws.com/dev/retro';
            axios.post(url, base, {
                headers: {
                  'x-api-key': process.env.REACT_APP_API_KEY
                }
              });
        }
        if(mensaje){
            enviarDatos();
        }
    }, [mensaje]);

    return ( 
        <Fragment>
            {
                (!errorFoto)
                ?
                <Fragment>
                    <div className="center mt-5" >
                        <h1 className="text-center">¿Qué tal te pareció nuestro servicio?</h1>
                    </div>
                    {
                        mensaje
                        ?
                        <div className="center mt-4">
                            <h2 className="text-center">¡Gracias por tu retroalimentación!</h2>
                        </div>
                        :
                        <div className="container center mt-4 mb-5">
                            <Stack direction="row" spacing={2}>
                                <Button variant="contained" size="large" startIcon={<Like />} onClick={like}>
                                    Like
                                </Button>
                                <Button variant="outlined" size="large" startIcon={<Medium />} onClick={medium}>
                                    Medium
                                </Button>
                                <Button variant="contained" size="large" startIcon={<Dislike />} onClick={dislike}>
                                    Dislike
                                </Button>
                            </Stack>
                        </div>
                    }
                </Fragment>
                :
                null
            }
        </Fragment>
     );
}
 
export default Retro;