var express = require('express')
var router = express.Router()
var handballMatchController = require('../../controllers/handball/matchController.js')
const jwtAuth = require('../../middleware/jwtCheck');
const adminCheck = require('../../middleware/adminCheck');

/*
 * GET
 */
router.get('/', handballMatchController.list)

router.get('/countBySeason/:season', handballMatchController.countBySeason)
router.get('/filterByLocation/:longitude/:latitude/:radius', handballMatchController.filterByLocation);
router.get('/filterBySeasonAndTeam/:season/:team', handballMatchController.filterBySeasonAndTeam);
router.get('/filterByDateRange/:startDate/:endDate', handballMatchController.filterByDateRange);
router.get('/filterByTeam/:teamId', handballMatchController.filterByTeam);
router.get('/filterByStadium/:stadium', handballMatchController.filterByStadium);
router.get('/filterBySeason/:season', handballMatchController.filterBySeason);
router.get('/filterByDate/:date', handballMatchController.filterByDate);

/*
 * GET
 */
router.get('/:id', handballMatchController.show)

/*
 * POST
 */
router.post('/', jwtAuth, adminCheck, handballMatchController.create)

/*
 * PUT
 */
router.put('/:id', jwtAuth, adminCheck, handballMatchController.update)

/*
 * DELETE
 */
router.delete('/:id', jwtAuth, adminCheck, handballMatchController.remove)

module.exports = router