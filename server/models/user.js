const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    score: Number
});

module.exports = mongoose.model('User', UserSchema);