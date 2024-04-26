const multer = require("multer");
const multerS3 = require("multer-s3");
const s3Client = require("../database/s3Client");

const uploadFile = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: "kulubucket",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, `${req.user.id}/${Date.now().toString()}-${file.originalname}`);
    },
  }),
});

const uploadProfilePicture = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: "kulubucket",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(
        null,
        `${req.user.id}/profile/${Date.now().toString()}-${file.originalname}`
      );
    },
  }),
});

module.exports = {
  uploadFile,
  uploadProfilePicture,
};
