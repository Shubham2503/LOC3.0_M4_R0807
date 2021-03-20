const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("../models/user");

const PostSchema = new Schema(
    {
        title: {
            type: String,
            trim: true,
        },
        description: String,
        likes: {
            type: Number,
            default: 0,
        },
        isNSFW: {
            type: Boolean,
            default: false,
        },
        images: String,
        user: { type: Schema.Types.ObjectId, ref: "User" },
        tags: [
            {
                tag: String,
            },
        ],
    },
    { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
