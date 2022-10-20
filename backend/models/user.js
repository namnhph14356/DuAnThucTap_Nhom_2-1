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

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }

    next();
});

userSchema.methods.comparePassword = async function(token){
    const result  = await bcrypt.compare(token, this.token);
    return result;
}


module.exports = mongoose.model("User", userSchema);