const multer = require("multer");
const multerS3 = require("multer-s3");
const s3Client = require("../database/s3Client");

const uploadFile = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: "kulubucket",
    contentLength: 5000000000000000000,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(
        null,
        `${req.user.id}/${req.params.projectId}/${Date.now().toString()}-${
          file.originalname
        }`
      );
    },
  }),
  limits: { fileSize: 1000000000000 },
});

const uploadProfilePicture = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: "kulubucket",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, `${req.user.id}/profile/profile`);
    },
  }),
});

module.exports = {
  uploadFile,
  uploadProfilePicture,
};
