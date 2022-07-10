import React, {Fragment} from 'react';
import Sesion from './Sesion';
import NavBarP from './NavBarP';

const HeaderLogueado = () => {
    return ( 
        <Fragment>
            <NavBarP/>
            <header className="fluid">
            <div className="container-sm contenedor">
                <h1 className="titulo">ShiftEmotion </h1>
                <Sesion/>
            </div>
        </header>
        </Fragment>
     );
}
 
export default HeaderLogueado;