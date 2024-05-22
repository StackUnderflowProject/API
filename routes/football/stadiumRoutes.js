const express = require('express')
const router = express.Router()
const stadiumController = require('../../controllers/football/stadiumController.js')
const jwtAuth = require('../../middleware/jwtCheck');
const adminCheck = require('../../middleware/adminCheck');

/*
 * GET
 */
router.get('/', stadiumController.list)

router.get('/filterBySeasonAndLocation/:season/:longitude/:latitude/:radius', stadiumController.filterBySeasonAndLocation)
router.get('/filterByLocation/:longitude/:latitude/:radius', stadiumController.filterByLocation)
router.get('/filterBySeason/:season', stadiumController.filterBySeason)
/*
 * GET
 */
router.get('/:id', stadiumController.show);
router.get('/getByTeam/:id', stadiumController.showByTeamId);

/*
 * POST
 */
router.post('/', jwtAuth, adminCheck, stadiumController.create)

/*
 * PUT
 */
router.put('/:id', jwtAuth, adminCheck, stadiumController.update)

/*
 * DELETE
 */
router.delete('/:id', jwtAuth, adminCheck, stadiumController.remove)

module.exports = router