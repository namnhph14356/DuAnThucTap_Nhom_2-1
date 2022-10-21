const express =  require('express');
const { create, verifyEmail, resendEmailVerificationToken, forgetPassword, sendResetPasswordTokenStatus, signIn, resetPassword } = require('../controllers/user');
const { userValidtor, validate, validatePassword, signInValidator } = require('../middlewares/validator');
const { isValidPasswordResetToken } = require("../middlewares/user");

const router = express.Router();

router.post("/create", userValidtor, validate, create);
router.post("/verify-email", verifyEmail);
router.post("/sign-in", signInValidator, validate, signIn);
router.post("/resend-email-verification-token", resendEmailVerificationToken);
router.post("/forger-password", forgetPassword)
router.post("/verify-pass-reset-token", isValidPasswordResetToken, sendResetPasswordTokenStatus)
router.post("/reset-pass", isValidPasswordResetToken, resetPassword, validate,validatePassword)


module.exports = router;