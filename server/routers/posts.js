const express = require("express");
const router = new express.Router();
const Post = require("../models/post");

// endpoint to create the post
router.post("/post/create", async (req, res) => {
    const newPost = new Post(req.body);
    try {
        await newPost.save();
        res.status(201).send(newPost);
    } catch (e) {
        res.status(400).send(e);
    }
});

// endpoint to get all post of a the database
router.get("/post/getAllPost", async (req, res) => {
    try {
        const posts = await Post.find({});
        // finding all the posts
        res.status(200).send(posts);
    } catch (e) {
        res.status(500).send(e);
        // server error
    }
});

// endpoint to get all post of a user
router.get("/post/getPost/:id", async (req, res) => {
    const _id = req.params.id;
    try {
        const particularPosts = await Post.findById(_id);
        if (!particularPosts) {
            return res.status(404).send();
        }
        res.status(200).send(particularPosts);
    } catch (e) {
        res.status(400).send();
    }
});

//update the posts
//only when the person is logged in
router.patch("/post/me", async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["title", "description", "isNSFW"];
    const isValid = updates.every((updates) => {
        return allowedUpdates.includes(updates);
    });
    if (!isValid) {
        return res.status(400).send({ error: "Invalid field" });
    }
    console.log(req.post);
    try {
        updates.forEach((updates) => {
            req.post[updates] = req.body[updates];
        });
        await req.post.save();
        res.send(req.post);
    } catch (e) {
        res.status(400).send(e);
    }
});

// likes update endpoint
router.post("/post/increaselike/:id", async (req, res) => {
    const _id = req.params.id;
    try {
        const flag = await Post.updateOne({ _id: _id }, { $inc: { likes: 1 } });
        res.send("done");
    } catch (e) {
        res.status(400).send(e);
    }
});

// endpoint to post the on the basis of the tags
router.get("/post/searchByTag/:tag", async (req, res) => {
    const tag = req.params.tag;
    try {
        const posts = await Post.find({ "tags.tag": tag });
        res.status(200).send(posts);
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;
