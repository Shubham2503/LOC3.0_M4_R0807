const express = require("express");
const router = new express.Router();
const Post = require("../models/post");
const multer = require("multer");
const got = require("got");
const auth = require("../middleware/auth");
const User = require("../models/user")

// endpoint to create the post
const isNSFW = (req, res, next) => {
    const apiKey = "acc_e83c4d07edfd9ac";
    const apiSecret = "9a4d7d6918606e0cbfc789a6fd9f677a";

    const imageUrl = req.body.images;
    const url =
        "https://api.imagga.com/v2/categories/nsfw_beta?image_url=" +
        encodeURIComponent(imageUrl);

    (async () => {
        try {
            const response = await got(url, {
                username: apiKey,
                password: apiSecret,
            });
            const t = await JSON.parse(response.body);

            const sfw = t.result.categories.find((el) => el.name.en === "safe");

            if (sfw && sfw.confidence > 80) {
                next();
            } else {
                res.status(400).send("nsfw safe val less than 90 ");
            }
        } catch (error) {
            res.status(400).send(error);
        }
    })();
};

router.post("/post/create", isNSFW, async (req, res) => {
    const newPost = new Post(req.body);
    try {
        await newPost.save();
        res.status(201).send(newPost);
    } catch (e) {
        res.status(400).send(e);
    }
});

// router.post(
//     "/post/create/img",
//     upload.single("images"),
//     async (req, res) => {
//         req.user.images = req.file.buffer;
//         await req.post.save();
//         res.send();
//     },
//     (error, req, res, next) => {
//         res.status(400).send({ error: error.message });
//     }
// );
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
        res.status(200).send("done");
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

//get all post of friends of user
router.get("/post/getFriendsPost/:id",  async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await User.findById(_id);
        const friends = user.friends;
        const friendsPost = await Post.find({user: {$in: friends}});
        res.status(200).send(friendsPost);
    } catch (e) {
        res.status(400).send();
    }
});

module.exports = router;