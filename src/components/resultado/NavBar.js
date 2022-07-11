import React, {useContext} from 'react';
import logo from '../../img/escucha.svg';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Return from '@material-ui/icons/ArrowBack';
import {ImagenContext} from '../../context/ImagenContext';
const NavBar = () => {
    //State de la imagen que viene desde el context
    const { setIsAuthenticated, guardarRegresar, guardarBase, guardarFoto, guardarNombre, guardarErrorfoto, guardarEmocion, guardarCargar, guardarReco } = useContext(ImagenContext);

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

    const regresar = ()=>{
        guardarRegresar(true);
        guardarCargar(false);
        guardarErrorfoto(false);
        guardarFoto({});
        guardarBase({});
        guardarNombre('');
        guardarEmocion('');
        guardarReco('');
    }

    return ( 
        <nav className="navbar navbar-dark bg-dark">
            <div className="container-fluid">
                <Link to="/home">
                    <Button variant="contained" size="small" startIcon={<Return/>} onClick={regresar}></Button>
                </Link>
                <a className="navbar-brand center">
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
     );
}
 
export default NavBar;