import apiCall from "../api";

const commonParams = {
    redirect_uri: process.env.REACT_APP_SPOTIFY_CALLBACK_HOST,
    client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
    client_secret: process.env.REACT_APP_SPOTIFY_CLIENT_SECRET
};

export const spotifyAuthCall = async(requiredParams)=>{

    try {
        
        const params = {
            ...requiredParams,
            ...commonParams,
        };
        const searchParams = Object.keys(params).map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(params[key])).join("&");
    
        const spotifyCall = await apiCall({
            method: 'POST',
            url: 'https://accounts.spotify.com/api/token',
            body: searchParams,
            headers: {"Content-type": "application/x-www-form-urlencoded"}
        });
    
        return await spotifyCall.json();

    } catch (error) {
        console.log(error);
    }
};

export const spotifySearchCall = async(paramsArray, token) =>{
    try {
        const url = new URL("https://api.spotify.com/v1/search");
        for (const item of paramsArray) {
            const key = Object.keys(item)[0];
            url.searchParams.append(key, item[key]);
        }

        const spotifyCall = await apiCall({
            method: 'GET',
            url,
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
        return await spotifyCall.json();
        
    } catch (error) {
        console.log(error);
    }
};

export const recognitionCall = async(foto) => {
    var myB64 = await blobtobase64(foto); //optencion del Base 64 del archivo

    var bodyjson = JSON.stringify({ //Armado de JSON para el body
        name: "MMGB6.jpg",
        content: myB64
    });

    var URL = process.env.REACT_APP_API_RECOGNITION_URL + "/APR_Lambda"; //Endpoint
    var params = {
        method: 'POST',
        body: bodyjson
    };
    return await fetch(URL, params).then(response => response.json());
};

const blobtobase64 = (blob) => { // Funcion para obtencion del base 64
    return new Promise((resolve,reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
            return resolve(reader.result.split(',')[1])
        }
    })
};

export const getQuerySpotify = (emotionsArray) => {
    var maxValue = Math.max(...emotionsArray.map(item => item.Confidence));
    var item = emotionsArray.find(x => x.Confidence === maxValue);
    var emotion = item.Type;
    let result;
    switch (emotion) {
        case "CALM":
            result = 'para bailar';
            break;

        case "SURPRISED":
            result = 'happy surprised';
            break;

        case "FEAR":
            result = 'calm songs';
            break;
    
        case "SAD":
            result = 'buen animo';
            break;

        case "CONFUSED":
            result = 'normal';
            break;

        case "DISGUSTED":
            result = 'canciones agradables';
            break;

        case "ANGRY":
            result = 'canciones tranquilas';
            break;

        case "HAPPY":
            result = 'happy happy songs';
        break;
        default:
            break;
    }
    return emotion + '|' + result;
};