const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");

router.get("/score", async (req, res) => {
    const data = await User.find({});
    data.sort((a, b) => {
        return b.score - a.score;
    });
    res.send(data);
});

router.get("/steps", async (req, res) => {
    const data = await User.find({});
    data.sort((a, b) => {
        return b.steps - a.steps;
    });
    res.send(data);
});

router.get("/calories", async (req, res) => {
    const data = await User.find({});
    data.sort((a, b) => {
        return b.calories - a.calories;
    });
    res.send(data);
});


router.get("/user", async (req, res) => {
    const newUser = new User(req.body);
    try {
        await newUser.save();
        res.status(201).send(newUser);
    } catch (e) {
        res.status(400).send(e);
    }
});

//endpoint for login
router.post("/user/login", async (req, res) => {

    const user = await User.findOne({email: req.body.email})
    if(user && user.password === req.body.password)
    {
        req.session.id = user._id;
        res.send(user._id)
    }
    else{
        res.status(401).send('kaabe lode')
    }

    // try {
    //     const user = await User.findByCredentials(
    //         req.body.email,
    //         req.body.password
    //     );
    //     const token = await user.generateAuthToken();
    //     //:user.getPublicProfile()
    //     // let h = new Headers();
    //     console.log(token)
    //     res.append("Authentication", `Bearer ${token}`);
        // res.send({ user, token });
    // } catch (e) {
    //     res.status(400).send(e);
    // }
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
