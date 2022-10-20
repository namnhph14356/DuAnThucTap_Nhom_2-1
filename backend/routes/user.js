const express =  require('express');
const { create, verifyEmail, resendEmailVerificationToken, forgetPassword, sendResetPasswordTokenStatus } = require('../controllers/user');
const { userValidtor, validate, validatePassword } = require('../middlewares/validator');

const router = express.Router();

router.post("/create", userValidtor, validate, create);
router.post("/verify-email", verifyEmail);
router.post("/resend-email-verification-token", resendEmailVerificationToken);
router.post("/forger-password", forgetPassword)
router.post("/verify-pass-reset-token", isValidPasswordToken, sendResetPasswordTokenStatus)
router.post("/reset-pass", isValidPasswordToken, resetPassword, validate,validatePassword)


module.exports = router;