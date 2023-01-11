const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const passSchema = new Schema({
    // title: { type: String, required: true },
    password: { type: String, required: true },
    // isEmailVerified: { type: Boolean, default: false }
});

module.exports = { password: mongoose.model('password', passSchema) }