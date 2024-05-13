var express = require('express')
var router = express.Router()
var footballMatchController = require('../../controllers/football/matchController.js')

/*
 * GET
 */
router.get('/', footballMatchController.list)

router.get('/filterByTeam/:teamId', footballMatchController.filterByTeam);
router.get('/filterByStadium/:stadiumId', footballMatchController.filterByStadium);

router.get('/filterByLocation/:longitude/:latitude/:radius', footballMatchController.filterByLocation);
router.post('/filterByDate', footballMatchController.filterByDate);
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