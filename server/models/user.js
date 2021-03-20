const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    score: Number,
    weight: Number,
    height: Number,
    age: Number,
    gender: String,
    calories: Number,
    steps: Number
});

module.exports = mongoose.model('User', UserSchema);