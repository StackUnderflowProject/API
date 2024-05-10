var express = require('express');
var router = express.Router();
var handballMatchController = require('../controllers/handball/handballMatchController.js');

/*
 * GET
 */
router.get('/', handballMatchController.list);

/*
 * GET
 */
router.get('/:id', handballMatchController.show);

/*
 * POST
 */
router.post('/', handballMatchController.create);

/*
 * PUT
 */
router.put('/:id', handballMatchController.update);

/*
 * DELETE
 */
router.delete('/:id', handballMatchController.remove);

module.exports = router;
