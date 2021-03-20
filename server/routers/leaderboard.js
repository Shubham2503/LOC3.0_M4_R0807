const express = require("express");
const router = new express.Router();
const User = require("../models/user");

router.get("/score", async (req, res) => {
    const data = await User.find({});
    res.send(data);
});
