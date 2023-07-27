const mongoose = require('mongoose');

const InteractiveVideoOptionSchema = new mongoose.Schema({
  label: String,
  nextVideoId: String
});

const InteractiveVideoSchema = new mongoose.Schema({
  id: String,
  url: String,
  LeadTimeField: Number,
  root: Boolean,
  options: [InteractiveVideoOptionSchema]
});

const postSchema = new mongoose.Schema({
  _id: String,
  userId: String,
  username: String,
  userPhotoUrl: String,
  mediaType: String,
  mediaUrl: String,
  title: String,
  text: String,
  like: [String],
  comments: [String],
  tags: [String],
  timestamp: Date,
  interactiveVideos: {
    type: [InteractiveVideoSchema],
    minItems: 0,
    required: false,
  }
},
{
    collection: 'Post',
    // _id returned as PostId
    toJSON: {
      transform: function (doc, ret) {
        ret.postId = ret._id;
        delete ret._id;
      },
    },
});

// Create a model for the "post" collection
const Post = mongoose.model('Post', postSchema);

module.exports = Post;