var express = require('express')
var router = express.Router()
var handballStadiumController = require('../../controllers/handball/stadiumController.js')

/*
 * GET
 */
router.get('/', handballStadiumController.list)

/*
 * GET
 */
router.get('/:id', handballStadiumController.show)

/*
 * POST
 */
router.post('/', handballStadiumController.create)

/*
 * PUT
 */
router.put('/:id', handballStadiumController.update)

/*
 * DELETE
 */
router.delete('/:id', handballStadiumController.remove)

module.exports = router
