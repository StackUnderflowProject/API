var express = require('express');
var router = express.Router();
var handballTeamController = require('../controllers/handball/handballTeamController.js');

/*
 * GET
 */
router.get('/', handballTeamController.list);

/*
 * GET
 */
router.get('/:id', handballTeamController.show);

/*
 * POST
 */
router.post('/', handballTeamController.create);

/*
 * PUT
 */
router.put('/:id', handballTeamController.update);

/*
 * DELETE
 */
router.delete('/:id', handballTeamController.remove);

module.exports = router;
