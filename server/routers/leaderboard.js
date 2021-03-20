const express = require("express");
const router = new express.Router();
const User = require("../models/user");

router.get("/score", async (req, res) => {
    const data = await User.find({});
    data.sort((a, b) => {
        return b.score - a.score;
    });
    res.send(data);
});

router.post("/score/update/:id", async (req, res) => {
    const _id = req.params.id;
    try {
        const scoreToBeAdded = req.body.score;
        await User.findByIdAndUpdate(
            { _id: _id },
            { $inc: { score: scoreToBeAdded } }
        );
        res.status(200).send("done");
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;
