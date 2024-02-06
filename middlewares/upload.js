const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: path.resolve(__dirname, "../temp"),
  filename: function (req, file, cb) {
    cb(null, Math.round(Math.random() * 1E9) + file.originalname)
  }
})

const upload = multer({ storage })

module.exports = upload;

