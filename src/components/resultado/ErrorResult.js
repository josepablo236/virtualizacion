import React, {useContext} from 'react';
import Button from '@material-ui/core/Button';
import Replay from '@material-ui/icons/ArrowBack';
import {Link} from 'react-router-dom';
import {ImagenContext} from '../../context/ImagenContext';

const ErrorResult = ({mensaje}) => {
    //State de la imagen que viene desde el context
    const { guardarRegresar, guardarCargar, guardarFoto, guardarBase, guardarErrorfoto, guardarNombre, guardarEmocion } = useContext(ImagenContext);

    const regresar = ()=>{
        guardarRegresar(true);
        guardarCargar(false);
        guardarFoto({});
        guardarBase({});
        guardarErrorfoto(false);
        guardarNombre('');
        guardarEmocion('');
    }

    return ( 
        <div className="container center">
            <div className="card bg-light mt-5">
                <div className="card-body">
                    <h1>{mensaje}</h1>
                    <p>Lo sentimos, intenta con otra imagen.</p>
                    <Link to="/home">
                    <Button variant="contained" size="large" startIcon={<Replay/>} onClick={regresar}>Regresar</Button>
                    </Link>
                </div>
            </div>
        </div>
     );
}
 
export default ErrorResult;