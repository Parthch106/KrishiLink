const { signup, login, verifyEmail, sendResetPasswordLink, resetPassword } = require('../Controllers/AuthController');
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');

const router = require('express').Router();

router.post('/login', loginValidation, login);
router.post('/signup', signupValidation, signup);
router.get('/verifyEmail', verifyEmail);
router.post('/sendResetPasswordLink', sendResetPasswordLink);
router.post('/resetpassword', resetPassword);

module.exports = router;