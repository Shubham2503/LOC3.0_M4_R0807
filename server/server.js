const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const leaderboard = require("./routers/leaderboard");
require("dotenv").config();
const User = require("./models/user");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
User.insertMany({ username: "harsh", score: 34 });
User.insertMany({ username: "fasdf", score: 56 });
User.insertMany({ username: "hfdsa", score: 45 });
//connect to mongoDB
const uri = process.env.ATLAS_URI;
mongoose.connect(
    uri,
    { useUnifiedTopology: true, useNewUrlParser: true },
    () => {
        console.log("connected to MongoDB");
    }
);
//Import Routes
// const userRoute = require('./routes/user')?
//middleware
// app.use('/user', userRoute)
app.use(leaderboard);

app.listen(port, () => {
    console.log(`server is running on ${port}`);
});
