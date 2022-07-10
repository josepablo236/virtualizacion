import React, {useContext, Fragment} from 'react';
import Button from '@material-ui/core/Button';
import UploadIcon from '@material-ui/icons/Image';
import Modal from '@material-ui/core/Modal';
import Box from '@material-ui/core/Box';
import Subir from './Subir';
import {ImagenContext} from '../../context/ImagenContext';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Sesion = () => {
    //State de la imagen que viene desde el context
    const { user, nombre } = useContext(ImagenContext);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return ( 
        <Fragment>
            <p className="subtitulo">Hola {user.nombre}! Haz click para seleccionar una imagen</p>
            <Button variant="contained" size="large" startIcon={<UploadIcon/>} onClick={handleOpen}>Cargar imagen</Button>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="row">
                    <h2>
                    Cargar Imagen
                    </h2>
                        {
                            !nombre
                            ?
                            <p>
                            Selecciona una imagen o toma una foto
                            </p>
                            :
                            <p>
                                {nombre}
                            </p>
                        }
                    <Subir/>
                    </div>
                </Box>
            </Modal>
        </Fragment>
     );
}
 
export default Sesion;