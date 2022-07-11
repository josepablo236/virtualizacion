import React, { Fragment, useState } from 'react';
import Button from '@material-ui/core/Button';
import Camera from '@material-ui/icons/CameraAlt';
import Replay from '@material-ui/icons/Replay';
import On from '@material-ui/icons/Camera';
import Back from '@material-ui/icons/ArrowBack';
import Download from '@material-ui/icons/CloudDownload';
import {Link} from 'react-router-dom';

const Foto = () => {

    //State de la foto
    const [foto, guardarFoto] = useState(false);
    //State de error
    const [error, guardarError] = useState(false);
    //State camara encendida
    const [encendida, guardarEncendida] = useState(false);
    
    const encenderCamara = () => {
        guardarEncendida(true);
        var video = document.querySelector('#v'), canvas = document.querySelector('#c');
        
        navigator.getUserMedia = (navigator.getUserMedia ||
                        navigator.webkitGetUserMedia ||
                        navigator.mozGetUserMedia ||
                        navigator.msGetUserMedia);
        
        if(navigator.getUserMedia){
            navigator.getUserMedia({video:true},function(stream){
                video.srcObject=stream;
                video.play();
            }, function(e){console.log(e);});
            video.addEventListener('loadedmetadata',function(){canvas.width = video.videoWidth; canvas.height = video.videoHeight;}, false);
        }
        else {
            guardarEncendida(false);
            alert('Tienes un navegador obsoleto');
        }
    }
    
    const tomarFoto = () =>{
        var img = document.getElementById('img');
        var canvas = document.getElementById('c');
        var video = document.getElementById('v');
        canvas.getContext('2d').drawImage(video,0,0);
        var imgData = canvas.toDataURL('image/png');
        img.setAttribute('src',imgData);
        guardarFoto(true);
    }

    const repetirFoto = () =>{
        guardarFoto(false);
        var img = document.getElementById('img');
        img.setAttribute('src',"");
    }

    const descargarFoto = () =>{
        const a = document.createElement("a");
        document.body.appendChild(a);
        var video = document.getElementById('v');
        var canvas = document.getElementById('c');
        var imgData = canvas.toDataURL('image/png');
        a.href = imgData;
        a.download = 'image.png'
        a.click();
        document.body.removeChild(a);
        video.pause();
        video.src = "";
        video.srcObject.getTracks()[0].stop();
    }

    const apagarCamara = ()=>{
        var video = document.getElementById('v');
        video.pause();
        video.src = "";
        if(video.srcObject !== null)
        {
            video.srcObject.getTracks()[0].stop();
        }
    }

    return ( 
        <div className="container">
            <h1 className="text-center">Toma una foto con tu cámara web</h1>
            <div className="row">
                <div className="col-md-6">
                    <video id='v' autoPlay></video>
                    <canvas id='c'></canvas>
                </div>
                <div className="col-md-6">
                    <img src="" alt="" id='img'/>
                </div>
            </div>
            {
                foto
                ?
                <div className="center">
                    <Button variant="contained" size="large" startIcon={<Replay/>} onClick={repetirFoto}>Repetir foto</Button>
                    <Link to="/subir-descarga">
                        <Button variant="contained" size="large" startIcon={<Download/>} onClick={descargarFoto}>Descargar foto</Button>
                    </Link>
                </div>
                :
                <Fragment>
                {!encendida
                ?
                    <div className="center mt-3">
                        <Link to="/home">
                        <Button variant="contained" size="large" startIcon={<Back/>}>Regresar</Button>
                        </Link>
                        <Button variant="contained" size="large" startIcon={<On/>} onClick={encenderCamara}>Encender camara</Button>
                    </div>
                :
                    <div className="center mt-3">
                        <Link to="/home">
                        <Button variant="contained" size="large" startIcon={<Back/>} onClick={apagarCamara}>Regresar</Button>
                        </Link>
                        <Button variant="contained" size="large" startIcon={<Camera/>} onClick={tomarFoto}>Tomar foto</Button>
                    </div>
                }
                </Fragment>
            }
        </div>
     );
}
 
export default Foto;