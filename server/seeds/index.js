const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const User = require("../models/user");
const Post = require("../models/post");
const express = require("express");
const axios = require('axios');

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());

const uri = process.env.ATLAS_URI;
const unsplashUri = process.env.UNSPLASH_URI;
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
img = [
    'https://images.unsplash.com/photo-1452830978618-d6feae7d0ffa?crop=entropy&cs=srgb&fm=jpg&ixid=MnwyMTY0NDZ8MHwxfGNvbGxlY3Rpb258MXw0NDAzMzgyfHx8fHwyfHwxNjE2MjQ2MTUw&ixlib=rb-1.2.1&q=85',
    'https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?crop=entropy&cs=srgb&fm=jpg&ixid=MnwyMTY0NDZ8MHwxfGNvbGxlY3Rpb258Mnw0NDAzMzgyfHx8fHwyfHwxNjE2MjQ2MTUw&ixlib=rb-1.2.1&q=85',
    'https://images.unsplash.com/photo-1501435544023-df4e0c503ae2?crop=entropy&cs=srgb&fm=jpg&ixid=MnwyMTY0NDZ8MHwxfGNvbGxlY3Rpb258M3w0NDAzMzgyfHx8fHwyfHwxNjE2MjQ2MTUw&ixlib=rb-1.2.1&q=85',
    'https://images.unsplash.com/photo-1460776960860-7adc30a4e69d?crop=entropy&cs=srgb&fm=jpg&ixid=MnwyMTY0NDZ8MHwxfGNvbGxlY3Rpb258NHw0NDAzMzgyfHx8fHwyfHwxNjE2MjQ2MTUw&ixlib=rb-1.2.1&q=85',
    'https://images.unsplash.com/photo-1459663011163-f464a3f2825e?crop=entropy&cs=srgb&fm=jpg&ixid=MnwyMTY0NDZ8MHwxfGNvbGxlY3Rpb258NXw0NDAzMzgyfHx8fHwyfHwxNjE2MjQ2MTUw&ixlib=rb-1.2.1&q=85',
    'https://images.unsplash.com/photo-1442975631115-c4f7b05b8a2c?crop=entropy&cs=srgb&fm=jpg&ixid=MnwyMTY0NDZ8MHwxfGNvbGxlY3Rpb258Nnw0NDAzMzgyfHx8fHwyfHwxNjE2MjQ2MTUw&ixlib=rb-1.2.1&q=85',
    'https://images.unsplash.com/photo-1491486354380-62695e5cdd87?crop=entropy&cs=srgb&fm=jpg&ixid=MnwyMTY0NDZ8MHwxfGNvbGxlY3Rpb258N3w0NDAzMzgyfHx8fHwyfHwxNjE2MjQ2MTUw&ixlib=rb-1.2.1&q=85',
    'https://images.unsplash.com/photo-1541626026743-e02dde06e6f9?crop=entropy&cs=srgb&fm=jpg&ixid=MnwyMTY0NDZ8MHwxfGNvbGxlY3Rpb258OHw0NDAzMzgyfHx8fHwyfHwxNjE2MjQ2MTUw&ixlib=rb-1.2.1&q=85',
    'https://images.unsplash.com/photo-1523294026206-60fe99504e54?crop=entropy&cs=srgb&fm=jpg&ixid=MnwyMTY0NDZ8MHwxfGNvbGxlY3Rpb258OXw0NDAzMzgyfHx8fHwyfHwxNjE2MjQ2MTUw&ixlib=rb-1.2.1&q=85',
    'https://images.unsplash.com/photo-1474631245212-32dc3c8310c6?crop=entropy&cs=srgb&fm=jpg&ixid=MnwyMTY0NDZ8MHwxfGNvbGxlY3Rpb258MTB8NDQwMzM4Mnx8fHx8Mnx8MTYxNjI0NjE1MA&ixlib=rb-1.2.1&q=85'
];

const seedDB = async () => {
    await User.deleteMany({});
    await Post.deleteMany({});

    for(let i = 0; i < 20; i++)
    {
        const user = new User({
            username: makeid(5),
            score: Math.floor((Math.random() * 100) + 1),
            weight: Math.floor((Math.random() * 150) + 30),
            height: Math.floor((Math.random() * 200) + 100),
            age: Math.floor((Math.random() * 60) + 10),
            gender: (Math.random() < 0.5 ? "male": 'female'),
            calories: Math.floor((Math.random() * 800) + 100),
            steps: Math.floor((Math.random() * 30000) + 1000)
        })

        
        tags = chooseRandom(2).map((el) => {return {tag: el}})
        const post = new Post({
            title: makeid(10), 
            description: lorem,
            likes: Math.floor((Math.random() * 100) + 0),
            isNSFW: Math.random() < 0.1,
            user: user,
            images: img[Math.floor(Math.random() * img.length)],
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


