import React, { useState, useContext} from 'react';
import "./style.css";

export default React.memo(function ListItem({ imageUrl, id, externalUrl, releaseDate, name, artist}) {
    
    const [song, setSong] = useState({
        id: '',
        name: '',
        artist: '',
        releaseDate: '',
        externalUrl: '',
        imageUrl: ''
    });

    let canciones = [];

    const handleOnClick = () =>{
        window.open(externalUrl, "_blank");
    };
    return(
        <div className="list-item" onClick={handleOnClick}>
            <img src={imageUrl} alt={id}/>
            <p className="list-item-title">{name}</p>
            <p className="list-item-artist">{artist}</p>
            <p className="list-item-date">{releaseDate}</p>
        </div>
    );
});

