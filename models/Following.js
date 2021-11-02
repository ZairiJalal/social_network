const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const FollowingSchema = new mongoose.Schema({
  account: {
    type: mongoose.Schema.ObjectId,
    ref: "Account",
    required: true
  },
  following: [
    {
      account: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "Account"
      }
    }
  ]
});

module.exports = mongoose.model("Following", FollowingSchema);
