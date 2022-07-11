const AWS = require('aws-sdk');
AWS.config.update({
	region: process.env.REGION
});
const dynamo = new AWS.DynamoDB.DocumentClient();
const tableResultado = process.env.TABLE_RESULTADO;
const tableEmociones = process.env.TABLE_EMOCIONES;
const historialPath = '/historial';
const emocionesPath = '/emociones';

exports.handler = async function(event){
    console.log('Request event: ', event);
    let response;
    switch(true){
        case event.httpMethod === 'GET' && event.path === historialPath:
        response = await getHistorial(event.queryStringParameters.email);
        break;
        case event.httpMethod === 'POST' && event.path === historialPath:
        response = await saveHistorial(JSON.parse(event.body), tableResultado);
        break;
        case event.httpMethod === 'POST' && event.path === emocionesPath:
        response = await saveHistorial(JSON.parse(event.body), tableEmociones);
        break;
        default:
        response = buildResponse(404, '404 Not Found');
    }
    return response;
}

async function getHistorial(user){
    const params = {
        TableName: tableResultado,
        Key:{
        'email':user
        }
    }
    return await dynamo.get(params).promise().then((response) => {
        return buildResponse(200, response.Item);
        }, (error) => {
            console.error('No se encontro el usuario', error);
        });
}

async function saveHistorial(requestBody, table){
    const params = {
    TableName: table,
    Item: requestBody
    }
    return await dynamo.put(params).promise().then(() =>{
    const body = {
        Operation: 'SAVE',
        Message: 'SUCCESS',
        Item: requestBody
    }
    return buildResponse(200, body);
    }, (error) => {
    console.error('Error al crear', error);
    })
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

