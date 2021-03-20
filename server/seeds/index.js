const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const User = require("../models/user");
const Post = require("../models/post");
const express = require("express");


const app = express();
const port = process.env.PORT || 5001;

app.use(cors());

const uri = process.env.ATLAS_URI;
console.log(uri);
mongoose.connect(
    uri,
    { useUnifiedTopology: true, useNewUrlParser: true },
    () => {
        console.log("connected to MongoDB");
    }
);

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const chooseRandom = (num = 1) => {
    arr= ['fitness', 'gym', 'workout', 'training', 'health', 'healthy', 'mindful'];
    const res = [];
    for(let i = 0; i < num; ){
       const random = Math.floor(Math.random() * arr.length);
       if(res.indexOf(arr[random]) !== -1){
          continue;
       };
       res.push(arr[random]);
       i++;
    };
    return res;
 };
 
lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec cursus vulputate nisl, sed posuere ex sodales posuere. Praesent sodales ante mattis massa viverra, ac accumsan massa hendrerit. Maecenas tortor risus, commodo eget lacus ac, posuere molestie nunc. Duis fermentum erat purus, et iaculis urna posuere vitae. Sed tincidunt enim a blandit laoreet. '
const seedDB = async () => {
    await User.deleteMany({});
    await Post.deleteMany({});

    for(let i = 0; i < 20; i++)
    {
        const user = new User({
            username: makeid(5),
            score: Math.floor((Math.random() * 100) + 1)
        })

        
        tags = chooseRandom(2).map((el) => {return {tag: el}})
        const post = new Post({
            title: makeid(10), 
            description: lorem,
            likes: Math.floor((Math.random() * 100) + 0),
            isNSFW: Math.random() < 0.1,
            user: user,
            images: 'https://unsplash.com/collections/4403382/fitness',
            tags: tags
        })

        // console.log(user, post);
        await user.save();
        await post.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})


app.listen(port, () => {
    console.log(`server is running on ${port}`);
});


