var express = require('express');
var router = express.Router();
const adminCheck = require('../middleware/adminCheck');
const jwtAuth = require('../middleware/jwtCheck');
const adminController = require('../controllers/adminController');

router.get("/", jwtAuth, adminCheck, adminController.list);

router.get("/isAdmin", jwtAuth, adminController.isAmdin);

router.post("/add/:id", jwtAuth, adminCheck, adminController.add);

router.delete("/remove/:id", jwtAuth, adminCheck, adminController.remove);

router.get("/openGates", jwtAuth, adminCheck, adminController.openAdminGates);

router.get("/closeGates", jwtAuth, adminCheck, adminController.closeAdminGates);

module.exports = router;
