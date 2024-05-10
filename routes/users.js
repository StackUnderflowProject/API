var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');

const userController = require("../controllers/userController");

// profile pictures setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/profile_pictures");
  },
  filename: (req, file, cb) => {
    var date = Date.now();
    file.newName = date + path.extname(file.originalname);
    cb(null, date + path.extname(file.originalname));
  }
})
const upload = multer({storage: storage})

/* GET users listing. */
router.get('/', userController.list);

router.get('/show/:id', userController.show);

router.post('/register', userController.create);

router.get('/login', userController.login);

router.delete('/:id', userController.remove);

router.post('/profilePicture', upload.single('profile_picture'), userController.uploadProfilePicture);

module.exports = router;
