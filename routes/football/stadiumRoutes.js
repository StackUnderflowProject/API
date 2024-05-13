var express = require('express')
var router = express.Router()
var stadiumController = require('../../controllers/football/stadiumController.js')

/*
 * GET
 */
router.get('/', stadiumController.list)

router.get('/filterByLocation/:longitude/:latitude/:radius', stadiumController.filterByLocation);

/*
 * GET
 */
router.get('/:id', stadiumController.show)

/*
 * POST
 */
router.post('/', stadiumController.create)

/*
 * PUT
 */
router.put('/:id', stadiumController.update)

/*
 * DELETE
 */
router.delete('/:id', stadiumController.remove)

module.exports = router