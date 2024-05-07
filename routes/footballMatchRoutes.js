var express = require('express');
var router = express.Router();
var footballMatchController = require('../controllers/footballMatchController.js');

/*
 * GET
 */
router.get('/', footballMatchController.list);

/*
 * GET
 */
router.get('/:id', footballMatchController.show);

/*
 * POST
 */
router.post('/', footballMatchController.create);

/*
 * PUT
 */
router.put('/:id', footballMatchController.update);

/*
 * DELETE
 */
router.delete('/:id', footballMatchController.remove);

module.exports = router;
