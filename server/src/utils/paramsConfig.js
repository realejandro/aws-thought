import { v4 as uuidv4 } from 'uuid';
import config from '../config/index.js'; // ensure proper extension if using ESM

// Process the req.file retrieved from the route to create a params object for S3
const createS3Params = (fileName) => {
  const myFile = fileName.originalname.split('.');
  const fileType = myFile[myFile.length - 1];

  const imageParams = {
    Bucket: config.bucket,
    Key: `${uuidv4()}.${fileType}`,
    Body: fileName.buffer,
    Acl: 'public-read',
  };

  return imageParams;
};

export default createS3Params;