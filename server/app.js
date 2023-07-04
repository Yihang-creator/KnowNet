const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config(); // dotenv is package to load environment variables
var cors = require('cors')
var indexRouter = require("./routes/index.js");
var postRouter = require("./routes/posts.js");
var awsRouter = require("./routes/awsPresignedURL.js");
var commentRouter = require("./routes/comments.js");
const { authenticationRequired } = require("./authMiddleware.js");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'cpsc455'
  };
  
var uri = `mongodb+srv://${process.env.mongoDB_username}:${process.env.mongoDB_password}@cluster0.mpphpz5.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(uri, options);

//authorization middleware


//app.use('/api/*', authenticationRequired);
// app.use("/", indexRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);
app.use("/api/aws/upload", awsRouter);

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080,() => console.log(`Server is running on port ${process.env.PORT || 8080}`));

