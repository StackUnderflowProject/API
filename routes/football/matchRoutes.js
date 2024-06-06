var express = require('express')
var router = express.Router()
var footballMatchController = require('../../controllers/football/matchController.js')
const jwtAuth = require('../../middleware/jwtCheck');
const adminCheck = require('../../middleware/adminCheck');

/*
 * GET
 */
router.get('/', footballMatchController.list)

router.get('/countBySeason/:season', footballMatchController.countBySeason)
router.get('/filterByLocation/:longitude/:latitude/:radius', footballMatchController.filterByLocation);
router.get('/filterByDateRange/:startDate/:endDate', footballMatchController.filterByDateRange);
router.get('/filterBySeasonAndTeam/:season/:team', footballMatchController.filterBySeasonAndTeam);
router.get('/filterByTeam/:teamId', footballMatchController.filterByTeam);
router.get('/filterByStadium/:stadium', footballMatchController.filterByStadium);
router.get('/filterBySeason/:season', footballMatchController.filterBySeason);
router.get('/filterByDate/:date', footballMatchController.filterByDate);
/*
 * GET
 */
router.get('/:id', footballMatchController.show)

/*
 * POST
 */
router.post('/', jwtAuth, adminCheck, footballMatchController.create)

/*
 * PUT
 */
router.put('/:id', jwtAuth, adminCheck, footballMatchController.update)

/*
 * DELETE
 */
router.delete('/:id', jwtAuth, adminCheck, footballMatchController.remove)

module.exports = router