const mongoose = require('mongoose');
const User = require('../models/user');

const uri = process.env.ATLAS_URI;
mongoose.connect(
    uri,
    { useUnifiedTopology: true, useNewUrlParser: true },
    () => {
        console.log("connected to MongoDB");
    }
);

const seedDB = async () => {
    await User.deleteMany({});
    
}

seedDB().then(() => {
    mongoose.connection.close();
})