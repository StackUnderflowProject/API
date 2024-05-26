var express = require('express')
var router = express.Router()
var eventController = require('../controllers/eventController')
const jwtAuth = require('../middleware/jwtCheck');
const adminCheck = require('../middleware/adminCheck');

/*
 * GET
 */
//router.get('/', eventController.list)
router.get('/follow/:eventId', jwtAuth, eventController.follow);
router.get('/upcoming', eventController.listUpcoming);

router.get('/filterByHost/:hostId', eventController.filterByHost);
router.get('/filterByLocation/:longitude/:latitude/:radius', eventController.filterByLocation);
router.get('/filterByActivity/:activityName', eventController.filterByActivity);

router.post('/filterByDate', eventController.filterByDate);
/*
 * GET
 */
router.get('/:id', eventController.show)

/*
 * POST
 */
router.post('/', jwtAuth, eventController.create)

/*
 * PUT
 */
router.put('/:id', jwtAuth, adminCheck, eventController.update)

/*
 * DELETE
 */
router.delete('/:id', jwtAuth, adminCheck, eventController.remove)

module.exports = router