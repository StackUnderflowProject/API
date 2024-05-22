var express = require('express')
var router = express.Router()
var handballStadiumController = require('../../controllers/handball/stadiumController.js')
const jwtAuth = require('../../middleware/jwtCheck');
const adminCheck = require('../../middleware/adminCheck');

/*
 * GET
 */
router.get('/', handballStadiumController.list)

router.get('/filterBySeasonAndLocation/:season/:longitude/:latitude/:radius', handballStadiumController.filterBySeasonAndLocation);
router.get('/filterByLocation/:longitude/:latitude/:radius', handballStadiumController.filterByLocation);
router.get('/filterBySeason/:season', handballStadiumController.filterBySeason);
/*
 * GET
 */
router.get('/:id', handballStadiumController.show);
router.get('/getByTeam/:id', handballStadiumController.showByTeamId);

/*
 * POST
 */
router.post('/', jwtAuth, adminCheck, handballStadiumController.create)

/*
 * PUT
 */
router.put('/:id', jwtAuth, adminCheck, handballStadiumController.update)

/*
 * DELETE
 */
router.delete('/:id', jwtAuth, adminCheck, handballStadiumController.remove)

module.exports = router