const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require("../models/user");


const PostSchema = new Schema({
    title: {
        type: String, 
        trim: true
    },
    description: String, 
    likes: Number,
    isNSFW: Boolean,
    images: [String],
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    tags: [
        {
            tag: String,
        }
    ]
});

module.exports = mongoose.model('Post', PostSchema);