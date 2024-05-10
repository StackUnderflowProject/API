var express = require('express');
var router = express.Router();
const adminCheck = require('../middleware/adminCheck');
const adminController = require('../controllers/adminController');

router.get("/", adminCheck, adminController.list);

router.post("/add", adminCheck, adminController.add);

router.delete("/remove/:id", adminCheck, adminController.remove);

router.get("/openGates", adminCheck, adminController.openAdminGates);

router.get("/closeGates", adminCheck, adminController.closeAdminGates);

module.exports = router;
