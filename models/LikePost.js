const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const LikePostSchema = new mongoose.Schema({
  post: { type: mongoose.Schema.ObjectId, required: true, ref: "Post" },
  accounts_likes: [
    {
      author: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "Account"
      }
    }
  ]
});

module.exports = mongoose.model("LikePost", LikePostSchema);
