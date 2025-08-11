import { S3Client, CreateBucketCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';

dotenv.config();

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  // Optionally configure credentials here or use default AWS CLI profile
});


const bucketName = 'user-images-' + Date.now();

const bucketParams = {
  Bucket: bucketName
};

async function createBucket() {
  try {
    const command = new CreateBucketCommand(bucketParams);
    const response = await s3Client.send(command);
    console.log(`✅ Bucket "${bucketName}" created successfully.`);
    console.log("📦 Location:", response.Location || "Created in region");
  } catch (err) {
    console.error("❌ Error creating bucket:", err.message);
    console.log(err)
  }
}

createBucket();
