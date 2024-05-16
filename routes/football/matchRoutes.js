var express = require('express')
var router = express.Router()
var footballMatchController = require('../../controllers/football/matchController.js')

/*
 * GET
 */
router.get('/', footballMatchController.list)

router.get('/filterByTeamAndSeason/:season/:team', footballMatchController.filterBySeasonAndTeam);
router.get('/filterByTeam/:teamId', footballMatchController.filterByTeam);
router.get('/filterByStadium/:stadium', footballMatchController.filterByStadium);
router.get('/filterBySeason/:season', footballMatchController.filterBySeason);
router.get('/filterByLocation/:longitude/:latitude/:radius', footballMatchController.filterByLocation);
router.get('/filterByDate/:date', footballMatchController.filterByDate);
/*
 * GET
 */
router.get('/:id', footballMatchController.show)

/*
 * POST
 */
router.post('/', footballMatchController.create)

/*
 * PUT
 */
router.put('/:id', footballMatchController.update)

/*
 * DELETE
 */
router.delete('/:id', footballMatchController.remove)

module.exports = router