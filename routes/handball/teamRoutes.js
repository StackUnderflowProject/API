const express = require('express')
const router = express.Router()
const handballTeamController = require('../../controllers/handball/teamController.js')

/*
 * GET
 */
router.get('/', handballTeamController.list)
router.get('/filterBySeason/:season', handballTeamController.filterBySeason)
/*
 * GET
 */
router.get('/:id', handballTeamController.show)

/*
 * POST
 */
router.post('/', handballTeamController.create)

/*
 * PUT
 */
router.put('/:id', handballTeamController.update)

/*
 * DELETE
 */
router.delete('/:id', handballTeamController.remove)

module.exports = router