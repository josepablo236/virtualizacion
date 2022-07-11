import ListItem from "./ListItem";
import {memo} from 'react';

export default memo(function Track({ id, name, externalUrl, artist, releaseDate, imageUrl}){

    return (
       <ListItem
        imageUrl= {imageUrl}
        id={id}
        externalUrl={externalUrl}
        releaseDate={releaseDate}
        name={name}
        artist={artist}
       />
    )
});