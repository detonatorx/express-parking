const mongoose = require('mongoose');

module.exports = mongoose.model('users', {
    email: String,
    password: String,
    userName: String,
    // number: Number,
    customer: Boolean,
    deactivated: Boolean
});
