const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: path.resolve(__dirname, "../temp"),
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({
  storage, limits: {
  fileSize: 500000,
} })

module.exports = upload;

