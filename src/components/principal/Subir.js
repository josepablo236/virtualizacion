import React, {useState, Fragment, useContext} from 'react';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Camera from '@material-ui/icons/CameraAlt';
import Select from '@material-ui/icons/ImageSearch';
import Send from '@material-ui/icons/Send';
import Cancel from '@material-ui/icons/Cancel';
import Stack from '@mui/material/Stack';
import {Link} from 'react-router-dom';
import {ImagenContext} from '../../context/ImagenContext';

const Input = styled('input')({
  display: 'none',
});

const Subir = () => {

    //State de la imagen que viene desde el context
    const { guardarFoto, guardarNombre, guardarCargar } = useContext(ImagenContext);

    //State del archivo subido
    const [archivo, guardarArchivo] = useState({});

    //State para mostrar la imagen y botón de subir
    const [mostrarboton,guardarMostrarBoton] = useState(false);

    //Funcion que se ejecuta al dar click en el botón para tomar foto
    const tomarFoto = ()=>{
        console.log("Tomar foto");
    }

    //Funcion que se ejecuta al da click en cancelar
    const cancelar = ()=>{
        guardarArchivo(null);
        guardarCargar(false);
        guardarNombre('');
        guardarMostrarBoton(false);
    }

    //Funcion que se ejecuta al seleccionar un archivo
    const archivoSeleccionado = e =>{
        guardarArchivo(e.target.files[0]);
        guardarNombre(e.target.files[0].name);
        guardarMostrarBoton(true);
    }

    //Funcion para enviar la foto
    const enviarFoto = () =>{
        guardarFoto(archivo);
        guardarCargar(true);
    }
    return ( 
        <Stack direction="row" alignItems="center" spacing={2}>
            
            {
                !mostrarboton
                ?
                <Fragment>
                    <label htmlFor="contained-button-file">
                        <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={archivoSeleccionado}/>
                        <Button variant="contained" component="span" startIcon={<Select/>}>
                        Seleccionar
                        </Button>
                    </label>
                    <Link to="/tomar-foto">
                        <Button variant="contained" component="span" startIcon={<Camera/>} onClick = {tomarFoto} >
                            Tomar foto
                        </Button>
                    </Link>
                </Fragment>
                :
                <Fragment>
                    <Link to="/resultado">
                    <Button variant="contained" component="span" onClick = {enviarFoto} endIcon={<Send/>}>
                        Enviar foto
                    </Button>
                    </Link>
                    <Button variant="contained" component="span" onClick = {cancelar} endIcon={<Cancel/>}>
                        Cancelar
                    </Button>
                </Fragment>
            }
        </Stack>
     );
}
 
export default Subir;