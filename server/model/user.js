const mongoose = require("mongoose");
const data = require("../data/users");

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
    },
    userPhotoUrl: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    blockedTags: [
      {
        type: String,
      },
    ],
    follow: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

// User.deleteMany({})
//   .then(() => console.log("All users deleted."))
//   .then(() => {
//     return User.create(data.users);
//   })
//   .then(() => {
//     console.log("Data preloaded successfully");
//   })
//   .catch((err) => {
//     console.error("Error: ", err);
//   });

module.exports = User;
