const express = require('express');
const authController = require('../controllers/authController');
const authHelpers = require('../authentication/authHelper');
const { authorize } = require('passport');

let router = express.Router();

router.get('/register', authController.register_a_user_get);
router.post('/register', authController.register_a_user_post);
router.get('/login', authController.login_a_user_get);
router.post('/login', authController.login_a_user_post);
router.get('/logout', authHelpers.loginRequired, authController.logout_a_user);

module.exports = router;