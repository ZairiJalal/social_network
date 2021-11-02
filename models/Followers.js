const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const FollowerSchema = new mongoose.Schema({
  account: {
    type: mongoose.Schema.ObjectId,
    ref: "Account",
    required: true
  },
  followers: [
    {
      account: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "Account"
      }
    }
  ]
});

module.exports = mongoose.model("Follower", FollowerSchema);
