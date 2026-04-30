const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const favoriteController = require('../controllers/favoriteController');
const { isAuthenticated } = require('../middleware/auth');

router.use(isAuthenticated);

router.get('/settings', userController.settingsPage);
router.post('/settings/profile', userController.updateProfile);
router.post('/settings/password', userController.changePassword);
router.get('/favorites', favoriteController.list);
router.post('/favorites/toggle', favoriteController.toggle);

module.exports = router;
