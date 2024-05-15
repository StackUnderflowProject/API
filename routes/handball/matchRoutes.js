var express = require('express')
var router = express.Router()
var handballMatchController = require('../../controllers/handball/matchController.js')

/*
 * GET
 */
router.get('/', handballMatchController.list)

router.get('/filterByLocation/:longitude/:latitude/:radius', handballMatchController.filterByLocation);
router.get('/filterByTeam/:teamId', handballMatchController.filterByTeam);
router.get('/filterByStadium/:stadium', handballMatchController.filterByStadium);
router.get('/filterBySeason/:season', handballMatchController.filterBySeason);
router.post('/filterByDate', handballMatchController.filterByDate);

/*
 * GET
 */
router.get('/:id', handballMatchController.show)

/*
 * POST
 */
router.post('/', handballMatchController.create)

/*
 * PUT
 */
router.put('/:id', handballMatchController.update)

/*
 * DELETE
 */
router.delete('/:id', handballMatchController.remove)

module.exports = router