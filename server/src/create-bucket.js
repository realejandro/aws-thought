import { S3Client, CreateBucketCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from 'uuid';

const s3Client = new S3Client({
  region: "us-east-1",
  // Optionally configure credentials here or use default AWS CLI profile
  // credentials: {
  //   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  //   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  // },
});

const bucketName = 'deep-thoughts-demo-bucket-' + uuidv4();

const bucketParams = {
  Bucket: bucketName,
};

async function createBucket() {
  try {
    const command = new CreateBucketCommand(bucketParams);
    const response = await s3Client.send(command);
    console.log(`✅ Bucket "${bucketName}" created successfully.`);
    console.log("📦 Location:", response.Location || "Created in region");
  } catch (err) {
    console.error("❌ Error creating bucket:", err.message);
  }
}

createBucket();
