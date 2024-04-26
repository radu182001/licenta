const { S3Client } = require("@aws-sdk/client-s3");
const config = require("config");

const s3Client = new S3Client({
  region: "eu-north-1",
  credentials: {
    accessKeyId: config.get("s3_accessKeyId"),
    secretAccessKey: config.get("s3_secretAccessKey"),
  },
});

module.exports = s3Client;
