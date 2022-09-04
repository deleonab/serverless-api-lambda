"use strict";
const { v4 } = require("uuid");
const AWS = require("aws-sdk");

const fetchTodos = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { completed } = JSON.parse(event.body);
  const { id } = event.pathParameters
let todo;

  
await dynamodb.update({
        TableName: "TodoTable" ,
        Key: { id },
        UpdateExpression: 'set completed = :completed',
        ExpressionAttributeValues: {
            ':completed' : completed
        },
        ReturnValues: "ALL_NEW"
}).promise()
    
  
return {
    statusCode: 200,
    body: JSON.stringify(todos),
  };
};

module.exports = {
  handler: fetchTodos
}