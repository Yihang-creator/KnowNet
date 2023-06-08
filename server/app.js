const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // dotenv is package to load environment variables

const app = express();


var uri = `mongodb+srv://${process.env.mongoDB_username}:${process.env.mongoDB_password}@cluster0.mpphpz5.mongodb.net/?retryWrites=true&w=majority`
console.log(uri);
mongoose.connect(uri, 
    {useNewUrlParser: true, useUnifiedTopology: true});

app.listen(8080,() => console.log('Server is running on port 5000'));