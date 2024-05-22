const express = require('express')
const router = express.Router()
const handballTeamController = require('../../controllers/handball/teamController.js')
const jwtAuth = require('../../middleware/jwtCheck');
const adminCheck = require('../../middleware/adminCheck');

/*
 * GET
 */
router.get('/', handballTeamController.list)
router.get('/filterBySeason/:season', handballTeamController.filterBySeason)
/*
 * GET
 */
router.get('/:id', handballTeamController.show)
router.get('/latest/:id', handballTeamController.showLatest);

/*
 * POST
 */
router.post('/', jwtAuth, adminCheck, handballTeamController.create)

/*
 * PUT
 */
router.put('/:id', jwtAuth, adminCheck, handballTeamController.update)

/*
 * DELETE
 */
router.delete('/:id', jwtAuth, adminCheck, handballTeamController.remove)

module.exports = router