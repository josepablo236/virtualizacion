import React, {Fragment} from 'react';
import NoSesion from './NoSesion';
import NavBarP from './NavBarP';

const Header = () => {
    return ( 
        <Fragment>
            <NavBarP/>
            <header className="fluid">
            <div className="container-sm contenedor">
                <h1 className="titulo">ShiftEmotion </h1>
                <NoSesion/>
            </div>
        </header>
        </Fragment>
     );
}
 
export default Header;