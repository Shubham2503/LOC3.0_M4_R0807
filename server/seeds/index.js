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

tagsarr= ['fitness', 'gym', 'workout', 'training', 'health', 'healthy', 'mindful', 'meditation'];
usernameArr = ["Gustav_Irwin","Brantley_Willard","Aldric_Vijay","Yves_Nathan","Montgomery_Samuel","Louie_Bennie","Mohammad_Gerardo", "Adalia_Dina","Esperanza_Emely","Sylvia_Mirabel","Harriet_Presley","Millie_Violet","Evie_Meagan","Heaven_Ainsleigh"];

const chooseRandom = (arr, num = 1) => {
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
    'https://images.unsplash.com/photo-1474631245212-32dc3c8310c6?crop=entropy&cs=srgb&fm=jpg&ixid=MnwyMTY0NDZ8MHwxfGNvbGxlY3Rpb258MTB8NDQwMzM4Mnx8fHx8Mnx8MTYxNjI0NjE1MA&ixlib=rb-1.2.1&q=85',
    'https://images.unsplash.com/photo-1594737625992-ef391874b13e?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80',
    'https://images.unsplash.com/photo-1555570089-3e4dc9087329?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80'
];

const seedDB = async () => {
    await User.deleteMany({});
    await Post.deleteMany({});

    let luser = new User({
        username: 'aaa',
        email: 'aaa@aaa.com',
        password: 'aaa',
        score:  0,
        weight: 0, 
        height: 0,
        age: 0,
        gender: 'male',
        calories: 0,
        steps: 0
    });
    luser.save();
    for(let i = 1; i < usernameArr.length; i++)
    {
        let user = new User({
            username: usernameArr[i],
            email: makeid(3)+'@'+makeid(3)+'.com',
            password: usernameArr[i],
            score: Math.floor((Math.random() * 100) + 1),
            weight: Math.floor((Math.random() * 150) + 30),
            height: Math.floor((Math.random() * 200) + 100),
            age: Math.floor((Math.random() * 60) + 10),
            gender: (Math.random() < 0.5 ? "male": 'female'),
            calories: Math.floor((Math.random() * 800) + 100),
            steps: Math.floor((Math.random() * 30000) + 1000),
            friends: [luser],
            goals: {title: makeid(3), description: 'aezakmi hello', time:'08:30'}
        })

        
        tags = chooseRandom(tagsarr, 2).map((el) => {return {tag: el}})
        const post = new Post({
            title: makeid(10), 
            description: lorem,
            likes: Math.floor((Math.random() * 100) + 0),
            user: user,
            images: img[Math.floor(Math.random() * img.length)],
            tags: tags
        })

        // console.log(user, post);
        luser = user;
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


