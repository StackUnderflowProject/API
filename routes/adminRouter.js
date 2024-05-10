var express = require('express');
var router = express.Router();
const adminCheck = require('../middleware/adminCheck');
const adminController = require('../controllers/adminController');
const adminManual = require('../manuals/adminManual');

// API Core
router.options("/", adminManual);
router.get("/", adminManual);

router.get("/", adminCheck, adminController.list);

router.post("/", adminCheck, adminController.add);

router.delete("/:id", adminCheck, adminController.remove);

module.exports = router;
