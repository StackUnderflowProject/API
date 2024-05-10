var express = require('express')
var router = express.Router()
var handballStandingController = require('../../controllers/handball/standingController.js')

/*
 * GET
 */
router.get('/', handballStandingController.list)

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
