const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { isAuthenticated } = require('../middleware/auth');

router.get('/new/:roomId', isAuthenticated, bookingController.showBookingForm);
router.post('/check-availability', bookingController.checkAvailability);
router.post('/', isAuthenticated, bookingController.createBooking);
router.get('/confirmation/:id', isAuthenticated, bookingController.confirmation);
router.get('/', isAuthenticated, bookingController.myBookings);
router.post('/:id/cancel', isAuthenticated, bookingController.cancel);

module.exports = router;
