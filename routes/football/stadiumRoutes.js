const express = require('express')
const router = express.Router()
const stadiumController = require('../../controllers/football/stadiumController.js')

/*
 * GET
 */
router.get('/', stadiumController.list)

router.get('/filterByLocation/:longitude/:latitude/:radius', stadiumController.filterByLocation)
router.get('/filterBySeason/:season', stadiumController.filterBySeason)
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