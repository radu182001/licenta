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

const getProfileImageGeneral = async (id) => {
  bucketName = values.bucketname;

  try {
    const listParams = {
      Bucket: bucketName,
      Prefix: `${id}/profile/`,
      MaxKeys: 1,
    };

    const data = await s3Client.send(new ListObjectsV2Command(listParams));

    if (!data.Contents || data.Contents.length === 0) {
      return null;
    }

    const key = data.Contents[0].Key;

    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    // Create a presigned URL valid for 60 minutes
    const image = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

    return image;
  } catch (s3Error) {
    console.error(`Error fetching profile picture for user ${id}:`, s3Error);
    return null;
  }
};

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
          req.params.projectId,
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

const uploadProfile = async (req, res) => {
  res.status(201).send({ msg: "Uploaded!" });
};

const getProjectFilesList = async (req, res) => {
  try {
    const result = await pool.query(
      queries.getFiles(req.params.projectId, req.query.page, req.query.pageSize)
    );

    const totalFiles = await pool.query(
      queries.totalFiles(req.params.projectId)
    );

    res.status(200).send({ body: result.rows, total: totalFiles.rows[0] });
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};

const getProjectAudioFilesList = async (req, res) => {
  try {
    const result = await pool.query(
      queries.getAudioFiles(
        req.params.projectId,
        req.query.page,
        req.query.pageSize
      )
    );

    const totalFiles = await pool.query(
      queries.totalAudioFiles(req.params.projectId)
    );

    res.status(200).send({ body: result.rows, total: totalFiles.rows[0] });
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};

const getArrangeFiles = async (req, res) => {
  try {
    const result = await pool.query(
      queries.getArrangeFiles(req.params.projectId)
    );

    res.status(200).send({ body: result.rows });
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};

const addToArrangeFile = async (req, res) => {
  try {
    const result = await pool.query(
      queries.addToArrangeFile(req.params.projectId, req.body.fileID)
    );

    res.status(201).send({ msg: "Added succesfully!" });
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};

const getDawAudios = async (req, res) => {
  try {
    const result = await pool.query(queries.getDawAudio(req.params.projectId));

    res.status(200).send({ body: result.rows });
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};

const addToDawAudio = async (req, res) => {
  try {
    const projectID = req.params.projectId;
    const { fileID, X, trackIndex } = req.body;

    id = await pool.query(
      queries.addToDawAudio(projectID, fileID, X, trackIndex)
    );

    res.status(201).send({ msg: "Added succesfully!", id: id.rows[0].id });
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};

const delDawAudio = async (req, res) => {
  try {
    await pool.query(queries.deleteDawAudio(req.params.id));
    return res.status(200).send({ msg: "Audio deleted successfully!" });
  } catch (error) {
    console.log("error");
    res.status(500).send({ error: "Error deleting audio" });
  }
};

const updateDawAudio = async (req, res) => {
  try {
    await pool.query(
      queries.updateDawAudio(
        req.params.id,
        req.body.x,
        req.body.startTime,
        req.body.endTime
      )
    );
    return res.status(200).send({ msg: "Changes saved" });
  } catch (error) {
    res.status(500).send({ error: "Error deleting audio" });
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
  const key = [req.params.userID, req.params.projectId, req.params.file].join(
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
  const key = [req.params.userID, req.params.projectId, req.params.file].join(
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
  addToDawAudio,
  getDawAudios,
  delDawAudio,
  updateDawAudio,
  getProfileImageGeneral,
  uploadProfile,
};
