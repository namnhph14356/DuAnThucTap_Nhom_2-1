const EmailVerificationToken = require('../models/emailVerificationToken');
const PasswordResetToken = require('../models/passwordResetToken');
const User = require('../models/user');
const nodemailer = require('nodemailer');
const { isValidObjectId } = require('mongoose');
const { sendError } = require("../utils/helper");
const { generateMailTransporter } = require('../utils/mail');


exports.create = async (req, res) => {
    const { name, email, password } = req.body;

    const oldUser = await User.findOne({ email });

    if (oldUser) return sendError(res, "This email is already in use!");

    const newUser = new User({ name, email, password });
    await newUser.save();

    // tạo otp 6 số
    let OTP = ''
    for (let i = 0; i <= 5; i++) {
        const randomVal = Math.round(Math.random() * 9)
        OTP += randomVal
    }

    // lưu trữ otp bên trong db
    const newEmailVerificationToken = new EmailVerificationToken({
        owner: newUser._id,
        token: OTP
    });
    await newEmailVerificationToken.save()

    // gửi otp cho người dùng
    var transport = generateMailTransporter()

    transport.sendMail({
        from: 'verification@reviewapp.com',
        to: newUser.email,
        subject: 'Email Verification',
        html: `
            <p>Your verification OTP</p>
            <h1>${OTP}</h1>

        `
    })

    res.status(201).json({ message: 'Please verify your email. OTP has been send to your Email' });
}

exports.verifyEmail = async (req, res) => {
    const { userId, OTP } = req.body;

    if (!isValidObjectId(userId)) return sendError(res, "Invalid User")

    const user = await User.findById(userId)
    if (!user) return sendError(res, "User not found")  

    if (user.isVerified) return sendError(res, "User is already verifiled") 

    const token = await EmailVerificationToken.findOne({ owner: userId })
    if (!token) return sendError(res, "Token not found")  

    const isMatched = await token.compaireToken(OTP)
    if (!isMatched) return sendError(res, "Please submit a valid OTP")

    user.isVerified = true;
    await user.save()

    await EmailVerificationToken.findByIdAndDelete(token._id)

    var transport = generateMailTransporter()
    transport.sendMail({
        from: 'verification@reviewapp.com',
        to: user.email,
        subject: 'Wellcom Email',
        html: "<h1>Wellcome to our app and thanks for choosing us. </h1>"
    })
    res.json({ message: 'your email is verified' })


}

exports.resendEmailVerificationToken = async (req, res) => {
    const { userId } = req.body;

    const user = await User.findById(userId);
    if (!user) return sendError(res, "user not found!");

    if (user.isVerified)
        return sendError(res, "This email id is already verified!");

    const alreadyHasToken = await EmailVerificationToken.findOne({
        owner: userId,
    });
    if (alreadyHasToken)
        return sendError(res, "Only after one hour you can request for another token!");

    // tạo otp 6 số
    let OTP = ''
    for (let i = 0; i <= 5; i++) {
        const randomVal = Math.round(Math.random() * 9)
        OTP += randomVal
    }

    // lưu otp vào db
    const newEmailVerificationToken = new EmailVerificationToken({
        owner: user._id,
        token: OTP,
    });

    await newEmailVerificationToken.save();

    // gửi otp cho user

    var transport = generateMailTransporter()

    transport.sendMail({
        from: "verification@reviewapp.com",
        to: user.email,
        subject: "Email Verification",
        html: `
        <p>Your verification OTP</p>
        <h1>${OTP}</h1>
  
    `,
    });

    res.json({
        message: "New OTP has been sent to your registered email accout.",
    });
};
exports.forgetPassword = async(res, req) => {
    const {email} = req.body;
    if(!email) return sendError(res, 'email is missing!');
    const user = await User.findOne({email});
    if(!user) return sendError(res, 'User not found!', 404);
    const alreadyHasToken =  await PasswordResetToken.findOne({owner: user._id});
    if(alreadyHasToken) return sendError(res, 'Only after  one hour you can request for another token!')
}

