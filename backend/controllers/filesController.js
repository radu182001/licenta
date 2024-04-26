const pool = require("../database/db");
const queries = require("../queries/chatQueries");
const validate = require("../utils/validation");
const {
  GetObjectCommand,
  ListObjectsV2Command,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const s3Client = require("../database/s3Client");

const uploadFile = async (req, res) => {
  if (req.file) {
    // The file has been uploaded and handled by Multer and multerS3
    res.send(`Uploaded successfully at ${req.file.key}!`);
  } else {
    // No file was uploaded
    res.status(400).send("No file was uploaded.");
  }
};

const getProfilePicture = async (req, res) => {
  const bucketName = "kulubucket";

  try {
    const listParams = {
      Bucket: bucketName,
      Prefix: `${req.user.id}/profile/`,
      MaxKeys: 1, // You might want to fetch only one file, or more depending on your logic
    };

    const data = await s3Client.send(new ListObjectsV2Command(listParams));

    if (!data.Contents) {
      return res.status(404).send({ error: "No profile image found." });
    }

    const key = data.Contents[0].Key;

    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    // Create a presigned URL valid for 60 minutes
    const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

    res.send({ url });
  } catch (error) {
    console.error("Error creating presigned URL", error);
    res.status(500).send({ error: "Error creating presigned URL" });
  }
};

const getFile = async (req, res) => {
  const bucketName = "kulubucket";
  const key = req.body.key;

  try {
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    // Create a presigned URL valid for 60 minutes
    const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

    res.send({ url });
  } catch (error) {
    console.error("Error creating presigned URL", error);
    res.status(500).send({ error: "Error creating presigned URL" });
  }
};

module.exports = {
  uploadFile,
  getProfilePicture,
  getFile,
};
