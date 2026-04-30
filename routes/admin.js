const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotelController');
const adminController = require('../controllers/adminController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.use(isAuthenticated, isAdmin);

router.get('/', adminController.dashboard);
router.get('/users', adminController.users);
router.get('/bookings', adminController.bookings);
router.post('/bookings/:id/status', adminController.updateBookingStatus);

// Hotels
router.get('/hotels', hotelController.adminIndex);
router.get('/hotels/new', hotelController.newForm);
router.post('/hotels', upload.fields([{ name: 'mainImage', maxCount: 1 }]), hotelController.create);
router.get('/hotels/:id/edit', hotelController.editForm);
router.put('/hotels/:id', upload.fields([{ name: 'mainImage', maxCount: 1 }]), hotelController.update);
router.delete('/hotels/:id', hotelController.delete);

// Rooms
router.get('/hotels/:hotelId/rooms', adminController.roomsIndex);
router.get('/hotels/:hotelId/rooms/new', adminController.roomForm);
router.post('/hotels/:hotelId/rooms', upload.single('image'), adminController.createRoom);
router.get('/hotels/:hotelId/rooms/:roomId/edit', adminController.roomForm);
router.put('/hotels/:hotelId/rooms/:roomId', upload.single('image'), adminController.updateRoom);
router.delete('/hotels/:hotelId/rooms/:roomId', adminController.deleteRoom);

module.exports = router;
