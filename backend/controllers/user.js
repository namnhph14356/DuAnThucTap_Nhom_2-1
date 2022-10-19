const EmailVerificationToken = require('../models/emailVerificationToken');
const User = require('../models/user');
const nodemailer = require('nodemailer');
const { isValidObjectId } = require('mongoose');

exports.create = async (req, res) => {
    const { name, email, password } = req.body;

    const oldUser = await User.findOne({ email });
    if (oldUser) return res.status(401).json({ error: "This email is already in use!" });
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
    var transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "522b6e2a39f1c1",
            pass: "c687d8862cd6b6"
        }
    });
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

exports.verifyEmail = async (req,res) => {
    const {userId, OTP} = req.body; 

    if(!isValidObjectId(userId)) return res.json({error: "Invalid User"});

    const user = await User.findById(userId)
    if(!user) return res.json({error: "user not found"});
    
    if(user.isVerified) return res.json({error: "user is already verifiled"});

    const token = await EmailVerificationToken.findOne({ owner: userId})
    if(!token) return res.json({error: "token not found "});




}