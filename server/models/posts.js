const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {
        type: String, 
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    likes: Number,
    isNSFW: Boolean,
    images: [{
        image: {
            type: Buffer
        }
    }]
});

module.exports = mongoose.model('Post', PostSchema);