const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            //emails to be unique
            unique: true,
            require: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 7,
        },
        age: {
            type: Number,
            default: 0,
            required: true,
            validate(value) {
                if (value < 0) {
                    throw new Error("Age must be a positive number");
                }
            },
        },
        weight: {
            type: Number,
            default: 0,
            required: true,
            validate(value) {
                if (value < 0)
                    throw new Error("weight must be greater than zero");
            },
        },
        tokens: [
            {
                token: {
                    type: String,
                    require: true,
                },
            },
        ],

        score: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", UserSchema);
