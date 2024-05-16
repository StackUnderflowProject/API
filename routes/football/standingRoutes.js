var express = require('express')
var router = express.Router()
var standingController = require('../../controllers/football/standingController.js')

/*
 * GET
 */
router.get('/', standingController.list)
router.get('/filterBySeasonAndTeam/:season/:team', standingController.filterBySeasonAndTeam)
router.get('/filterByTeam/:team', standingController.filterByTeam)
router.get('/filterBySeason/:season', standingController.filterBySeason)

/*
 * GET
 */
router.get('/:id', standingController.show)

/*
 * POST
 */
router.post('/', standingController.create)

/*
 * PUT
 */
router.put('/:id', standingController.update)

/*
 * DELETE
 */
router.delete('/:id', standingController.remove)

module.exports = router