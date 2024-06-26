const express = require('express')
const router = express.Router()
const handballStandingController = require('../../controllers/handball/standingController.js')
const jwtAuth = require('../../middleware/jwtCheck');
const adminCheck = require('../../middleware/adminCheck');

/*
 * GET
 */
router.get('/', handballStandingController.list)
router.get('/filterBySeasonAndTeam/:season/:team', handballStandingController.filterBySeasonAndTeam)
router.get('/filterByTeamName/:teamName', handballStandingController.filterByTeamName)
router.get('/filterBySeason/:season', handballStandingController.filterBySeason)
router.get('/filterByTeam/:team', handballStandingController.filterByTeam)
/*
 * GET
 */
router.get('/:id', handballStandingController.show)

/*
 * POST
 */
router.post('/', jwtAuth, adminCheck, handballStandingController.create)

/*
 * PUT
 */
router.put('/:id', jwtAuth, adminCheck, handballStandingController.update)

/*
 * DELETE
 */
router.delete('/:id', jwtAuth, adminCheck, handballStandingController.remove)

module.exports = router