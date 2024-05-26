const express = require('express')
const router = express.Router()
const footballTeamController = require('../../controllers/football/teamController.js')
const jwtAuth = require('../../middleware/jwtCheck');
const adminCheck = require('../../middleware/adminCheck');

/*
 * GET
 */
router.get('/', footballTeamController.list)
router.get('/name', footballTeamController.getTeamNames)
router.get('/name/:season', footballTeamController.getTeamNamesBySeason)
router.get('/filterBySeason/:season', footballTeamController.filterBySeason)
/*
 * GET
 */
router.get('/:id', footballTeamController.show);
router.get('/latest/:id', footballTeamController.showLatest);

/*
 * POST
 */
router.post('/', jwtAuth, adminCheck, footballTeamController.create)

/*
 * PUT
 */
router.put('/:id', jwtAuth, adminCheck, footballTeamController.update)

/*
 * DELETE
 */
router.delete('/:id', jwtAuth, adminCheck, footballTeamController.remove)

module.exports = router