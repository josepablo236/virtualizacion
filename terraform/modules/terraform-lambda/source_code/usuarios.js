const AWS = require('aws-sdk');
AWS.config.update({
	region: process.env.REGION
});
const dynamo = new AWS.DynamoDB.DocumentClient();
const dynamodbTableName = process.env.TABLE_USUARIOS;
const usersPath = '/users';

exports.handler = async function(event){
    console.log('Request event: ', event);
    let response;
    switch(true){
        case event.httpMethod === 'GET' && event.path === usersPath:
        response = await getUser(event.queryStringParameters.email);
        break;
        case event.httpMethod === 'POST' && event.path === usersPath:
        response = await saveUser(JSON.parse(event.body));
        break;
        default:
        response = buildResponse(404, '404 Not Found');
    }
    return response;
}

async function getUser(user){
    const params = {
        TableName: dynamodbTableName,
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

async function saveUser(requestBody){
    const params = {
    TableName: dynamodbTableName,
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
    console.error('Error al crear usuario', error);
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

