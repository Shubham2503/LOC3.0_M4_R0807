const express = require("express");
const router = new express.Router();
const User = require("../models/user");

//get user details
router.get("/user/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findById(_id).populate({
      path: "friends",
    });
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/friend/:userId/:friendKey", async (req, res) => {
  const { userId, friendKey } = req.params;
  try {
    //test userid: 6055fd6eb17d53243c8015c1
    //friendKey: IhE8A
    const user = await User.findById(userId);
    const friend = await User.findOne({ username: friendKey });
    if (friend) {
      user.friends.push(friend);
      user.save();
      res.status(200).send("done");
    } else res.status(400).send("friendKey not found");
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/friendById/:userId/:friendId", async (req, res) => {
  const { userId, friendId } = req.params;
  try {
    //test userid: 6055fd6eb17d53243c8015c1
    //friendKey: IhE8A
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);
    if (friend) {
      user.friends.push(friend);
      user.save();
      res.status(200).send("done");
    } else res.status(400).send("friendKey not found");
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
