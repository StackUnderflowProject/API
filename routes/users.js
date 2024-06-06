var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');
const adminCheck = require('../middleware/adminCheck');
const jwtAuth = require('../middleware/jwtCheck');
const userController = require("../controllers/userController");

// profile pictures setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/home/MatijaPajenk/public/images/profile_pictures");
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

router.post('/login', userController.login);

router.delete('/:id', jwtAuth, adminCheck, userController.remove);

router.put('/update/:id', jwtAuth, adminCheck, userController.update);

router.put('/profilePicture', jwtAuth, upload.single('profile_picture'), userController.uploadProfilePicture);

module.exports = router;