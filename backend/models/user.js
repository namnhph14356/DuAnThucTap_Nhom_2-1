const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        require: true
    },
    email: {
        type: String,
        trim: true,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    isVerified: {
        type: Boolean,
        require: true,
        default: false
    },
})

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = bcrypt.hash(this.password, 10);
    }
    next();
})
module.exports = mongoose.model("User", userSchema);