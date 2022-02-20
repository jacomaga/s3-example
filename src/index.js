require('dotenv').config();
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const prompt = require('prompt-sync')();

const filePath = prompt('Enter the path of your file: ');
const file = fs.readFileSync(path.resolve(filePath));
const fileName = filePath.split('/').pop();

const uploadFile = async function (data, filename) {
  const S3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });
  const params = {
    Key: filename,
    Body: data,
    Bucket: process.env.AWS_BUCKET_NAME,
  };
  try {
    const callback = await S3.upload(params).promise();
    return callback;
  } catch (error) {
    return error;
  }
};

uploadFile(file, fileName).then((message) => console.log(message));
