import { CreateTableCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";

export const main = async () => {
   const client = new DynamoDBClient({}); 
  const command = new CreateTableCommand({
    TableName: "Thought",
    // For more information about data types,
    // see https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.NamingRulesDataTypes.html#HowItWorks.DataTypes and
    // https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Programming.LowLevelAPI.html#Programming.LowLevelAPI.DataTypeDescriptors
    AttributeDefinitions: [
      {
        AttributeName: "Thought",
        AttributeType: "S",
      },
    ],
    KeySchema: [
      {
        AttributeName: "Thought",
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