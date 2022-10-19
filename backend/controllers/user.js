const User = require('../models/user');

exports.create = async (req, res) => {
    const { name, email, password } = req.body;

    const oldUser = await User.findOne({ email });
    if (oldUser) return res.status(401).json({ error: "This email is already in use!" });
    const newUser = new User({ name, email, password });
    await newUser.save();
    // var transport = nodemailer.createTransport({
    //     host: "smtp.mailtrap.io",
    //     port: 2525,
    //     auth: {
    //         user: "522b6e2a39f1c1",
    //         pass: "c687d8862cd6b6"
    //     }
    // });
    res.status(201).json({ user: newUser });
}