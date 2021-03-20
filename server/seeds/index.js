const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const User = require("../models/user");


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
 


const seedDB = async () => {
    await User.deleteMany({});
    for(let i = 0; i < 20; i++)
    {
        const user = new User({
            username: makeid(5),
            score: Math.floor((Math.random() * 100) + 1)
        })
        await user.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})


app.listen(port, () => {
    console.log(`server is running on ${port}`);
});