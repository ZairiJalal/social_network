const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const LikeCommentSchema = new mongoose.Schema({
  comment: { type: mongoose.Schema.ObjectId, required: true, ref: "Comment" },
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

module.exports = mongoose.model("LikeComment", LikeCommentSchema);
