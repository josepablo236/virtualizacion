import React from 'react';
import avion from '../../img/emosion.jpg';
import lago from '../../img/musica.jpg';
import playa from '../../img/guitarra.jpeg';

const Informacion = () => {
    return (  
        <div className="container mb-5">
            <div className="row">
                <div className="col-sm-6 col-md-4">
                    <div className="card mb-3">
                        <img src={playa} className="card-img-top" alt="..." height="230px"/>
                        <div className="card-body">
                            <h1 className="class-Title">¿No sabes qué escuchar?</h1>
                            <p className="card-text">Muestranos una foto tuya y nosotros pondremos la música por ti.</p>
                            <p className="card-text">Gracias a la inteligencia artificial (IA), puedes obtener recomendaciones en base a sus gustos y preferencias.</p>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-md-4">
                    <div className="card mb-3">
                        <img src={avion} className="card-img-top" alt="..." height="230px"/>
                        <div className="card-body">
                            <h1 className="class-Title">Música para el mood de hoy</h1>
                            <p className="card-text">Te mostramos la música perfecta para tu estado de ánimo.</p> 
                            <p className="card-text">Nuestro sistema de recomendaciones de música toma en cuenta factores externos e internos de los usuarios.</p>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-md-4">
                    <div className="card mb-3">
                        <img src={lago} className="card-img-top" alt="..." height="230px"/>
                        <div className="card-body">
                            <h1 className="class-Title">Chequea tu historial en base a tus emociones</h1>
                            <p className="card-text">Escucha las canciones guardadas en tu historial de recomendaciones.</p>
                            <p className="card-text">Las recomendaciones se realizan en base a emociones expresadas por los usuarios.</p>
                        </div>
                    </div>
                </div>
            </div>
            </div>
    );
}
 
export default Informacion;