import { Router } from "express";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DeleteCommand, DynamoDBDocumentClient, PutCommand, QueryCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION || "us-east-1",
}); //create the connection with the AWS DB
const docClient = DynamoDBDocumentClient.from(client); 

const table = "Thoughts";

const router = Router();

router.get('/users', async(req, res) => {
  const command = new ScanCommand({
    TableName: table,
  });
  
  const response = await docClient.send(command);
  console.log(response)

  try {
    res.status(201).json(response.Items);
  } catch(error){
    console.error({ errorMessage : error})
  }

})


router.get('/users/:username', async(req, res) => {
  const { username } = req.params;

  const command = new QueryCommand({
    TableName: table,
    KeyConditionExpression: 'username = :u',
    ExpressionAttributeValues: {
      ':u': username,
    },
  });

  const response = await docClient.send(command);
  console.log(response)
  try {
    if (response.Items.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(response.Items[0]);
  } catch (error) {
    console.log(error)
    res.status(401).json(response.Items[0])
  }

})

router.post('/users', async(req, res) => {
  const { username, thought, image } = req.body;

  const newThought = new PutCommand({
    TableName: table,
    Item:{
      username: username,
      createdAt: Date.now(),
      thought: thought,
      image: image  // add new image attribute
    }
  });
  
  try {
    await docClient.send(newThought);
    console.log("✅ PutItem succeeded:", username);
    res.status(201).json(docClient, " Is created");
  } catch (err) {
    console.error("❌ Unable to add thought", username, "\nError:", err.message);
  }
  
})

router.delete('/users/:username', async(req , res) => {
  const { username } = req.params;

  const deletedUsername = new DeleteCommand({
    TableName: table,
    Key: { 
      username: username
    } 
  });

  try {
    await docClient.send(deletedUsername);
    res.status(201).json({
      message: username + "deleted"
    })
  } catch (error) {
    res.status(404).json({ message : error.message })
  }

})

export { router as userRoutes };

