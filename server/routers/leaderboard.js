const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");
const session = require('express-session');

router.get("/score", async (req, res) => {
    const data = await User.find({});
    data.sort((a, b) => {
        return b.score - a.score;
    });
    res.send(data);
});

router.get("/user", async (req, res) => {
    const newUser = new User(req.body);
    console.log("fasdf");
    try {
        await newUser.save();
        res.status(201).send(newUser);
    } catch (e) {
        res.status(400).send(e);
    }
});

//endpoint for login
router.post("/user/login", async (req, res) => {
    try {
        const user = await User.findByCredentials(
            req.body.email,
            req.body.password
        );
        const token = await user.generateAuthToken();
        req.session.token = token
        //:user.getPublicProfile()
        // let h = new Headers();
        res.append("Authentication", `Bearer ${token}`);
        res.send({ user, token });
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post("/score/update/:id", auth, async (req, res) => {
    const _id = req.params.id;
    try {
        const scoreToBeAdded = req.body.score;
        console.log(req);
        await User.findByIdAndUpdate(
            { _id: _id },
            { $inc: { score: scoreToBeAdded } }
        );
        res.status(200).send("done");
    } catch (e) {
        res.status(400).send(e);
    }
});

//
module.exports = router;
