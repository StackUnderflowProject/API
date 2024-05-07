var express = require('express')
var router = express.Router()
var matchController = require('../controllers/footballMatchController')

/*
 * GET
 */
router.get('/', matchController.list)

/*
 * GET
 */
router.get('/:id', matchController.show)

/*
 * POST
 */
router.post('/', matchController.create)

/*
 * PUT
 */
router.put('/:id', matchController.update)

/*
 * DELETE
 */
router.delete('/:id', matchController.remove)

module.exports = router
