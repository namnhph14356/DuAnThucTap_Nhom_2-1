const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const actorSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        require: true
    },
    about: {
        type: String,
        trim: true,
        require: true,
    },
    gender: {
        type: String,
        trim: true,
        require: true
    },
    avatar: {
        type: Object,
        url: String,
        public_id: String
    }
}, {timestamps:true});




module.exports = mongoose.model("Actor", actorSchema); 