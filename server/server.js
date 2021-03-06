const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const leaderboard = require("./routers/leaderboard");
require("dotenv").config();
const User = require("./models/user");
const postRouter = require("./routers/posts");
const goalsRouter = require("./routers/goals");
const userRouter = require("./routers/userRoutes");
const session = require("express-session");

const app = express();
const port = process.env.PORT || 5000;
app.use(
  session({ secret: "notagoodsecret", resave: false, saveUninitialized: true })
);

app.use(cors());
app.use(express.json());

//connect to mongoDB
const uri = process.env.ATLAS_URI;
mongoose.connect(
  uri,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    console.log("connected to MongoDB");
  }
);

// random
//Import Routes
// const userRoute = require('./routes/user')?
//middleware
// app.use('/user', userRoute)
app.use(leaderboard);
app.use(postRouter);
app.use(goalsRouter);
app.use(userRouter);

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
