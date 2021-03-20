const express = require("express");
const router = new express.Router();
const User = require("../models/user");

router.get("/score", async (req, res) => {
    const data = await User.find({});
    data.sort((a, b) => {return b.score - a.score})
    res.send(data);
});

module.exports = router;
