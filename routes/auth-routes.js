const express = require('express');
const authController = require('../controllers/authController');
const authHelpers = require('../authentication/authHelper');

let router = express.Router();

router.get('/register', authHelpers.checkAlreadyAuthenticated, authController.register_a_user_get);
router.post('/register', authHelpers.checkAlreadyAuthenticated, authController.register_a_user_post);
router.get('/login', authHelpers.checkAlreadyAuthenticated, authController.login_a_user_get);
router.post('/login', authHelpers.checkAlreadyAuthenticated, authController.login_a_user_post);
router.get('/logout', authHelpers.loginRequired, authController.logout_a_user);
router.get('/getusername', authController.get_username);

module.exports = router;