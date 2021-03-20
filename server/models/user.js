const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        username: {
            type: String,
        },
        email: {
            type: String,
            //emails to be unique
        },
        password: {
            type: String,
        },
        age: {
            type: Number,
            default: 0,
        },
        weight: {
            type: Number,
        },
        tokens: [
            {
                token: {
                    type: String,
                },
            },
        ],

        score: {
            type: Number,
            default: 0,
        },

        goals: [
            {
                title: String,
                description: String,
                time: String
            }
        ]
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", UserSchema);
