const AWS = require('aws-sdk');
AWS.config.update({
	region: process.env.REGION
});
const dynamo = new AWS.DynamoDB.DocumentClient();
const tablaUsuarios = process.env.TABLE_USUARIOS;
const tablaHistorial = process.env.TABLE_HISTORIAL;
const tablaEmociones = process.env.TABLE_EMOCIONES;
const tablaRetro = process.env.TABLE_RETRO;
const dashboardPath = '/dashboard';

exports.handler = async function(event){
    console.log('Request event: ', event);
    let response;
    switch(true){
        case event.httpMethod === 'GET' && event.path === dashboardPath:
        response = await getDashboardData();
        break;
        default:
        response = buildResponse(404, '404 Not Found');
    }
    return response;
}

async function getDashboardData(){
    const pUsers = {
        TableName: tablaUsuarios
    };
    const pHistorial = {
        TableName: tablaHistorial
    };
    const pRetro = {
        TableName: tablaRetro
    };
    const pEmotion = {
        TableName: tablaEmociones
    };
    const allUsers = await selectAll(pUsers, []);
    const allRecomendations =  await selectAll(pHistorial, []);
    const usersRecomendations = await recomendationsPerUser(allRecomendations);
    const allRetro = await selectAll(pRetro, []);
    const segmentRetro = await groupRetro(allRetro);
    const allEmotions = await selectAll(pEmotion, []);
    const segmentEmotion = await groupEmotions(allEmotions);
    const body = {
        users: allUsers.length,
        recomendations: usersRecomendations,
        retros: segmentRetro,
        emotions: segmentEmotion
    }
    return buildResponse(200, body);
}

async function selectAll(scanParams, itemArray){
    try {
        const dynamoData = await dynamo.scan(scanParams).promise();
        itemArray = itemArray.concat(dynamoData.Items);
        if(dynamoData.LastEvaluateKey){
            scanParams.ExclusiveStartkey = dynamoData.LastEvaluateKey;
            return await selectAll(scanParams,itemArray);
        }
        return itemArray;
    } catch (error) {
        console.error('Internal server error', error);
    }
}

async function recomendationsPerUser(allRecomendations){
    try {
        let recoPorUser = [];
        let total = 0;
        allRecomendations.forEach(user => {
            let canciones = 0;
            user.body.forEach(reco =>{
                canciones +=1;
                total++;
            });
            let item = {
                email: user.email,
                nombre: user.nombre,
                recomendaciones: canciones
            }
            recoPorUser.push(item);
        });
        let totalObject = {
            email: 'admin@gmail.com',
            nombre: 'admin',
            recomendaciones: total
        }
        recoPorUser.push(totalObject);
        return recoPorUser;
    } catch (error) {
        console.error('Internal server error', error);
    }
}

async function groupRetro(allRetro){
    try {
        let likes = 0;
        let dislikes = 0;
        let medium = 0;
        let total = 0;
        allRetro.forEach(item => {
            switch(item.retro){
                case 'Like':
                    likes++;
                    break;
                case 'Dislike':
                    dislikes++;
                    break;
                case 'Medium':
                    medium++;
                    break;
            }
        });
        total = likes + dislikes + medium;
        const body = [
            {
                nombre: 'likes',
                valor: likes
            },
            {
                nombre: 'medium',
                valor: medium
            },
            {
                nombre: 'dislikes',
                valor: dislikes
            },
            {
                nombre: 'total',
                valor: total
            }
        ];
        return body;
    } catch (error) {
        console.error('Internal server error', error);
    }
}

async function groupEmotions(allEmotions){
    try {
        let calm = 0;
        let surprised = 0;
        let fear = 0;
        let sad = 0;
        let confused = 0;
        let disgusted = 0;
        let angry = 0;
        let happy = 0;
        let total = 0;
        allEmotions.forEach(item => {
            switch (item.emocion) {
                case "CALM":
                    calm++;
                    break;
        
                case "SURPRISED":
                    surprised++;
                    break;
        
                case "FEAR":
                    fear++;
                    break;
            
                case "SAD":
                    sad++;
                    break;
        
                case "CONFUSED":
                    confused++;
                    break;
        
                case "DISGUSTED":
                    disgusted++;
                    break;
        
                case "ANGRY":
                    angry++;
                    break;
        
                case "HAPPY":
                    happy++;
                    break;
        default:
            break;
    }
        });
        total = calm + surprised + fear + sad + confused + disgusted + angry + happy;
        const body = [
            {
                nombre: 'calm',
                valor: calm
            },
            {
                nombre: 'surprised',
                valor: surprised
            },
            {
                nombre: 'fear',
                valor: fear
            },
            {
                nombre: 'sad',
                valor: sad
            },
            {
                nombre: 'confused',
                valor: confused
            },
            {
                nombre: 'disgusted',
                valor: disgusted
            },
            {
                nombre: 'angry',
                valor: angry
            },
            {
                nombre: 'happy',
                valor: happy
            },
            {
                nombre: 'total',
                valor: total
            }
        ];
        return body;
    } catch (error) {
        console.error('Internal server error', error);
    }
}

function buildResponse(statusCode, body){
    return {
        statusCode: statusCode,
        headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': "*",
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
    body: JSON.stringify(body)
    }
}

