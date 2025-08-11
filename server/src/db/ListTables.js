import { DynamoDBClient, ListTablesCommand } from "@aws-sdk/client-dynamodb";
import dotenv from "dotenv";
dotenv.config();

const client = new DynamoDBClient({
  region: process.env.AWS_REGION || "us-east-1",
});

const listTables = async () => {
  try {
    const response = await client.send(new ListTablesCommand({}));
    console.log("✅ Tables found:", response.TableNames);
  } catch (err) {
    console.error("❌ Error listing tables:", err);
  }
};

listTables();