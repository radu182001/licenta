const pool = require("../database/db");
const queries = require("../queries/fileQueries");
const userQueries = require("../queries/userQueries");
const validate = require("../utils/validation");
const {
  GetObjectCommand,
  ListObjectsV2Command,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const s3Client = require("../database/s3Client");
const values = require("../utils/values");

const uploadFile = async (req, res) => {
  if (req.file) {
    const name = req.file.originalname.slice(
      0,
      req.file.originalname.lastIndexOf(".")
    );
    const size = req.file.size;
    const format = req.file.mimetype;
    const key = req.file.key;

    console.log(name, size, format, key);

    try {
      const result = await pool.query(
        queries.uploadFile(
          name,
          size,
          format,
          req.user.id,
          req.params.projectID,
          key
        )
      );

      const username = await pool.query(userQueries.getUsername(req.user.id));

      res.status(201).send({
        body: { ...result.rows[0], username: username.rows[0].username },
      });
    } catch (error) {
      return res.status(500).send({ error: error });
    }
  } else {
    // No file was uploaded
    res.status(400).send({ error: "No file was uploaded." });
  }
};

const getProjectFilesList = async (req, res) => {
  try {
    const result = await pool.query(
      queries.getFiles(req.params.id, req.query.page, req.query.pageSize)
    );

    const totalFiles = await pool.query(queries.totalFiles(req.params.id));

    res.status(200).send({ body: result.rows, total: totalFiles.rows[0] });
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};

const getProjectAudioFilesList = async (req, res) => {
  try {
    const result = await pool.query(
      queries.getAudioFiles(req.params.id, req.query.page, req.query.pageSize)
    );

    const totalFiles = await pool.query(queries.totalAudioFiles(req.params.id));

    res.status(200).send({ body: result.rows, total: totalFiles.rows[0] });
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};

const getArrangeFiles = async (req, res) => {
  try {
    const result = await pool.query(queries.getArrangeFiles(req.params.id));

    res.status(200).send({ body: result.rows });
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};

const addToArrangeFile = async (req, res) => {
  try {
    const result = await pool.query(
      queries.addToArrangeFile(req.params.projectID, req.body.fileID)
    );

    res.status(200).send({ msg: "Added succesfully!" });
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};

const getProfilePicture = async (req, res) => {
  const bucketName = values.bucketname;

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
  const bucketName = values.bucketname;
  const key = [req.params.userID, req.params.projectID, req.params.file].join(
    "/"
  );

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

const deleteFile = async (req, res) => {
  const bucketName = values.bucketname;
  const key = [req.params.userID, req.params.projectID, req.params.file].join(
    "/"
  );

  const deleteCommand = new DeleteObjectCommand({
    Bucket: bucketName,
    Key: key,
  });

  try {
    const data = await s3Client.send(deleteCommand);
    await pool.query(queries.deleteFile(key));
    return res.status(200).send({ msg: "File deleted successfully!" });
  } catch (error) {
    res.status(500).send({ error: "Error deleting file" });
  }
};

module.exports = {
  uploadFile,
  getProfilePicture,
  getFile,
  getProjectFilesList,
  getProjectAudioFilesList,
  deleteFile,
  getArrangeFiles,
  addToArrangeFile,
};
