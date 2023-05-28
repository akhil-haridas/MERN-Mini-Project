const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // Only accept jpeg, jpg, png image files
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("File type not supported"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

router.post('/register', UserController.postSigup);

router.post('/login', UserController.postLogin);

router.get('/userProfile',  UserController.userProfile);

router.post('/editProfilePhoto', upload.single('image'), UserController.editProfilePhoto);

module.exports = router;
