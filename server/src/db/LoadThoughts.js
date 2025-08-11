import { readFile } from 'fs/promises';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { PutCommand, DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();


// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load seed data
const filePath = path.join(__dirname, '../seed/users.json');
const allUsers = JSON.parse(await readFile(filePath, 'utf8'));

// Initialize DynamoDB client
const client = new DynamoDBClient({
    region: process.env.AWS_REGION || "us-east-1",
  });
const ddbDocClient = DynamoDBDocumentClient.from(client);

console.log("Importing thoughts into DynamoDB. Please wait.");

for (const user of allUsers) {
  const params = new PutCommand({
    TableName: "Thoughts",
    Item: {
      username: user.username,
      createdAt: user.createdAt,
      thought: user.thought
    }
  });

  try {
    await ddbDocClient.send(params);
    console.log("✅ PutItem succeeded:", user.username);
  } catch (err) {
    console.error("❌ Unable to add thought", user.username, "\nError:", err.message);
  }
}