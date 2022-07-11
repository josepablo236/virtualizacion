import React from 'react';
import Camara from '../../img/camara.svg';
import Analisis from '../../img/analisis.svg';
import Escucha from '../../img/escucha2.svg';
import Historial from '../../img/escucha3.svg';
const Pasos = () => {

    return ( 
        <div className="container mb-4">
            <div className="row titulo-contenedor">
            <h1 className="titulo-seccion">Pasos a seguir:</h1>
            </div>
            <div className="row">
                <div className="col-sm-6 col-md-3 pasos">
                    <p className="paso">Elige una imagen tuya o tómate una selfie</p>
                    <img src={Camara} width="100%" alt="Camara" className="imagen-pasos"/>
                </div>
                <div className="col-sm-6 col-md-3 pasos">
                    <p className="paso">Presiona “Enviar” para analizar la foto seleccionada</p>
                    <img src={Analisis} width="100%" alt="Camara" className="imagen-pasos"/>
                </div>
                <div className="col-sm-6 col-md-3 pasos">
                    <p className="paso">Escucha las recomendaciones que tenemos para ti</p>
                    <img src={Escucha} width="100%" alt="Camara" className="imagen-pasos"/>
                </div>
                <div className="col-sm-6 col-md-3 pasos">
                    <p className="paso">Visualiza y escucha tu historial de canciones</p>
                    <img src={Historial} width="100%" alt="Camara" className="imagen-pasos"/>
                </div>
            </div>
        </div>
     );
}
 
export default Pasos;