var express = require('express')
var router = express.Router()
var handballMatchController = require('../../controllers/handball/matchController.js')

/*
 * GET
 */
router.get('/', handballMatchController.list)


router.get('/filterByLocation/:longitude/:latitude/:radius', handballMatchController.filterByLocation);
/*
 * GET
 */
router.get('/:id', handballMatchController.show)

/*
 * POST
 */
router.post('/', handballMatchController.create)

/*
 * PUT
 */
router.put('/:id', handballMatchController.update)

/*
 * DELETE
 */
router.delete('/:id', handballMatchController.remove)

module.exports = router