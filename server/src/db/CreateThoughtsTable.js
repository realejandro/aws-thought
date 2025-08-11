import { CreateTableCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import dotenv from 'dotenv';

dotenv.config();

export const main = async () => {
  const client = new DynamoDBClient({
    region: process.env.AWS_REGION || "us-east-1",
    credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  }
  }); 
  const command = new CreateTableCommand({
    TableName: "Thoughts",
    // For more information about data types,
    // see https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.NamingRulesDataTypes.html#HowItWorks.DataTypes and
    // https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Programming.LowLevelAPI.html#Programming.LowLevelAPI.DataTypeDescriptors
    AttributeDefinitions: [
      {
        AttributeName: "username",
        AttributeType: "S",
      },
    ],
    KeySchema: [
      {
        AttributeName: "username",
        KeyType: "HASH",
      },
    ],
    BillingMode: "PAY_PER_REQUEST",
  });

  try {
    const response = await client.send(command);
    console.log("Table created:", response.TableDescription.TableName);
  } catch (err) {
    console.error("Error creating table:", err);
  }
};
// snippet-end:[dynamodb.JavaScript.table.createTableV3]

// Invoke main function if this file was run directly.
main();