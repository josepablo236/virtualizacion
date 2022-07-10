import React, {Fragment } from 'react';
import HeaderLogueado from './HeaderLogueado';
import Footer from './Footer';
import Historial from './Historial';

const Logueado = () => {

    return ( 
        <Fragment>
            <HeaderLogueado/>
            <Historial/>
            <Footer/>
        </Fragment>
     );
}
 
export default Logueado;