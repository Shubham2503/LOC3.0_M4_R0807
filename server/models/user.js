const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
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
        ],
        friends: [
            { type: Schema.Types.ObjectId, ref: "User"},
        ]
    },
    {
        timestamps: true,
    }
);

UserSchema.virtual("posts", {
    ref: "Post",
    localField: "_id",
    foreignField: "user",
});

UserSchema.methods.generateAuthToken = async function () {
    const user = this;
    // added experiy date in 1 hour
    const token = jwt.sign(
        { _id: user._id.toString() },
        process.env.JWT_SECRET
    );

    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
};

UserSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("Unable to find user");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Unable to login");
    return user;
};

UserSchema.pre("save", async function (next) {
    const user = this;
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});
const User = mongoose.model("User", UserSchema);
module.exports = User;
