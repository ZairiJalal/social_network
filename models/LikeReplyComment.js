const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const commentReplyLikeSchema = new mongoose.Schema({
  comment: { type: mongoose.Schema.ObjectId, required: true, ref: "Reply" },
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

module.exports = mongoose.model("CommentReplyLike", commentReplyLikeSchema);
