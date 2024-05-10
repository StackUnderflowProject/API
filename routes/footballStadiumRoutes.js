var express = require('express')
var router = express.Router()
var stadiumController = require('../controllers/football/footballStadiumController.js')

/*
 * GET
 */
router.get('/', stadiumController.list)

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
