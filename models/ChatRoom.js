const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const ChatRoom = new mongoose.Schema({
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "Account" }],
  roomName: { type: String, default: "" },
  lastActive: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  messages: { type: Number, default: 0 },
});

module.exports = mongoose.model("ChatRoom", ChatRoom);
