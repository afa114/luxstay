const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotelController');

router.get('/', hotelController.index);
router.get('/:slug', hotelController.show);

module.exports = router;
