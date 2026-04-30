const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { isAuthenticated } = require('../middleware/auth');

router.post('/', isAuthenticated, reviewController.create);
router.delete('/:id', isAuthenticated, reviewController.delete);

module.exports = router;
