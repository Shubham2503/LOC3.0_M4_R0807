const express = require("express");
const router = new express.Router();
const User = require('../models/user')

//create goals for userid
router.post("/goals/:id",  async (req, res) => {
    const {time, description, title} = req.body;
    const newGoal = {time, description, title};
    const _id = req.params.id;

    try {
        const user = await User.findById(_id);
        user.goals.push(newGoal);
        const r = await user.save();
        res.status(201).send(r);
    } catch (e) {
        res.status(400).send(e);
    }
});


// endpoint to get all goals of a userid
router.get("/goals/:id", async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await User.findById(_id);
        res.status(200).send(user.goals);
    } catch (e) {
        res.status(500).send(e);
    }
});


module.exports = router;
