var express = require('express');
var router = express.Router();
var footballTeamController = require('../controllers/football/footballTeamController.js');

/*
 * GET
 */
router.get('/', footballTeamController.list);

/*
 * GET
 */
router.get('/:id', footballTeamController.show);

/*
 * POST
 */
router.post('/', footballTeamController.create);

/*
 * PUT
 */
router.put('/:id', footballTeamController.update);

/*
 * DELETE
 */
router.delete('/:id', footballTeamController.remove);

module.exports = router;
