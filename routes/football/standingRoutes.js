var express = require('express')
var router = express.Router()
var standingController = require('../../controllers/football/standingController.js')
const jwtAuth = require('../../middleware/jwtCheck');
const adminCheck = require('../../middleware/adminCheck');

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
router.post('/', jwtAuth, adminCheck, standingController.create)

/*
 * PUT
 */
router.put('/:id', jwtAuth, adminCheck, standingController.update)

/*
 * DELETE
 */
router.delete('/:id', jwtAuth, adminCheck, standingController.remove)

module.exports = router