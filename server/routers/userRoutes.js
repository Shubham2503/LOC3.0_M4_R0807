const express = require("express");
const router = new express.Router();
const User = require('../models/user')

//get user details
router.get("/user/:id", async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await User.findById(_id);
        res.status(200).send(user);
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;
