const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
    },
    userPhotoUrl: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    follow: [{
        type: String,
    }],
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);