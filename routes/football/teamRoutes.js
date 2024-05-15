const express = require('express')
const router = express.Router()
const footballTeamController = require('../../controllers/football/teamController.js')

/*
 * GET
 */
router.get('/', footballTeamController.list)
router.get('/filterBySeason/:season', footballTeamController.filterBySeason)
/*
 * GET
 */
router.get('/:id', footballTeamController.show)

/*
 * POST
 */
router.post('/', footballTeamController.create)

/*
 * PUT
 */
router.put('/:id', footballTeamController.update)

/*
 * DELETE
 */
router.delete('/:id', footballTeamController.remove)

module.exports = router