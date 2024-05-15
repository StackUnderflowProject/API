const express = require('express')
const router = express.Router()
const handballStandingController = require('../../controllers/handball/standingController.js')

/*
 * GET
 */
router.get('/', handballStandingController.list)
router.get('/filterBySeason/:season', handballStandingController.filterBySeason)

/*
 * GET
 */
router.get('/:id', handballStandingController.show)

/*
 * POST
 */
router.post('/', handballStandingController.create)

/*
 * PUT
 */
router.put('/:id', handballStandingController.update)

/*
 * DELETE
 */
router.delete('/:id', handballStandingController.remove)

module.exports = router