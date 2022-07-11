import React, {Fragment} from 'react';
import Header from './Header';
import Pasos from './Pasos';
import Informacion from './Informacion';
import Footer from './Footer';

const Principal = () => {
    
    return ( 
        <Fragment>
            <Header/>
            <Pasos/>
            <Informacion/>
            <Footer/>
        </Fragment>
     );
}
 
export default Principal;