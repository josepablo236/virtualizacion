import React, {useState, Fragment, useContext } from 'react';
import {ImagenContext} from '../../context/ImagenContext';
import Retro from './Retro';
import Footer from '../principal/Footer';
import NavBar from './NavBar';
import ErrorResult from './ErrorResult';
import Canciones from '../principal/Canciones';

const Resultado = () => {

    //State de la imagen que viene desde el context
    const { errorfoto } = useContext(ImagenContext);
    //State de loading
    const [loading, guardarLoading] = useState(true);

    //Tiempo de carga
    setTimeout(()=>{
        guardarLoading(false);
    }, 2000);

    if(loading){
        return(
            <div className="d-flex justify-content-center center mt-5">
                <div className="spinner-border" style={{width: '5rem', height: '5rem'}} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }
    else{
        return ( 
            <Fragment>
                <NavBar/>
                {
                    (!errorfoto)
                    ?
                    <Fragment> 
                        <Canciones
                        mensaje = 'Resultado de canciones:'
                        />
                            <Retro/>
                            {/* <Form/> */}
                        <Footer/>
                    </Fragment>
                    :
                    <ErrorResult mensaje='La imagen no fue reconocida'/>
                }
            </Fragment>
            );
    }
}
 
export default Resultado;