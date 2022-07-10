import React, {useContext, Fragment} from 'react';
import logo from '../../img/escucha.svg';
import {Link} from 'react-router-dom';
import {ImagenContext} from '../../context/ImagenContext';

const NavBarP = () => {
    //State de la imagen que viene desde el context
    const { isAuthenticated, setIsAuthenticated, guardarRegresar, guardarCargar, guardarFoto, guardarNombre, guardarErrorfoto, guardarEmocion, guardarReco } = useContext(ImagenContext);

    const cerrarSesion = ()=>{
        setIsAuthenticated(false);
        guardarFoto({});
        guardarRegresar(false);
        guardarNombre('');
        guardarErrorfoto(false);
        guardarEmocion('');
        guardarReco('');
        guardarCargar(false);
    }
    return ( 
        <Fragment>
            {
                isAuthenticated 
                ?
                <nav className="navbar navbar-dark bg-dark">
                    <div className="container-fluid">
                        <a className="navbar-brand">
                        <img src={logo} alt="" width="30" height="24" className="d-inline-block align-text-top"/>
                        ShiftEmotion
                        </a>
                        <form className="d-flex" onSubmit={cerrarSesion}>
                            <Link to="/">
                            <button className="btn btn-secundario" type="submit" onClick={cerrarSesion}>Salir</button>
                            </Link>
                        </form>
                    </div>
                </nav>
                :
                null
            }
        </Fragment>
     );
}
 
export default NavBarP;