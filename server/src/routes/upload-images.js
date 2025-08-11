import { Router } from "express";
import multer from 'multer';
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from '@aws-sdk/lib-storage';
import createS3Params from "../utils/paramsConfig.js";


const router = Router();

const s3Client = new S3Client({region: 'us-east-1'});

const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, '');
  },
});

const upload = multer({ storage }).single('image');

router.post('/image-upload', upload , async(req, res) => {
  console.log("post('/api/image-upload'", req.file);
  const params = createS3Params(req.file);

  // Use Upload helper for multipart upload
    const parallelUpload = new Upload({
      client: s3Client,
      params,
      queueSize: 4,           // optional concurrency settings
      partSize: 5 * 1024 * 1024, // 5MB part size
      leavePartsOnError: false
    });

    // Await upload completion
    const data = await parallelUpload.done();

    // Send back S3 response data
    res.json(data);
  
})

export { router as imageRoutes };