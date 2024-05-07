var express = require('express')
var router = express.Router()
var standingController = require('../controllers/footballStandingController.js')

/*
 * GET
 */
router.get('/', standingController.list)

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
