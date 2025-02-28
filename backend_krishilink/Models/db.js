const mongoose = require('mongoose');

const mongo_url = "mongodb+srv://parth106:test123@cluster0.v0jm5wd.mongodb.net/strafficdatabase";

mongoose.connect(mongo_url)
    .then(() => {
        console.log('MongoDB Connected...');
    }).catch((err) => {
        console.log('MongoDB Connection Error: ', err);
    })