const AWS = require('aws-sdk');
AWS.config.update({
	region: process.env.REGION
});
const dynamo = new AWS.DynamoDB.DocumentClient();
const dynamodbTableName = process.env.TABLE_RETRO;
const usersPath = '/retro';

exports.handler = async function(event){
    console.log('Request event: ', event);
    let response;
    switch(true){
        case event.httpMethod === 'POST' && event.path === usersPath:
        response = await saveRetro(JSON.parse(event.body));
        break;
        default:
        response = buildResponse(404, '404 Not Found');
    }
    return response;
}

async function saveRetro(requestBody){
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
    console.error('Error al crear retroalimentacion', error);
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

