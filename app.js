const httpErrors = require("http-errors");
const express = require("express");
const socketIo = require("socket.io");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const app = express();
const io = socketIo();
const controllerAccount = require("./controllers/controllerAccount");
const postsRouter = require("./routes/postRouter");
const accountsRouter = require("./routes/accountRouter");
const commentsRouter = require("./routes/commentRouter");
const notificationRouter = require("./routes/notificationRouter");
const chatRouter = require("./routes/chatRouter");
require("dotenv").config({ path: "variables.env" });
require("./models/Post");
require("./models/Account");
require("./models/Comment");
require("./models/ReplyComment");
require("./models/CommentReplyLike");
require("./models/LikeComment");
require("./models/LikePost");
require("./models/Following");
require("./models/Followers");
require("./models/Notification");
require("./models/ChatRoom");
require("./models/Message");

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


app.io = io;
app.set("socketio", io);
io.use((socket, next) => {
  if (socket.handshake.query && socket.handshake.query.token) {
    const token = socket.handshake.query.token.split(" ")[1];
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) return next(new Error("Authentication error"));
      socket.accountData = decoded;
      next();
    });
  } else {
    next(new Error("Authentication error"));
  }
}).on("connection", (socket) => {
  // Connection now authenticated to receive further events
  socket.join(socket.accountData.accountId);
  io.in(socket.accountData.accountId).clients((err, clients) => {
    controllerAccount.changeStatus(socket.accountData.accountId, clients, io);
    //console.log(clients);
  });
  socket.on("typing", (data) => {
    socket.to(data.accountId).emit("typing", { roomId: data.roomId });
  });
  socket.on("stoppedTyping", (data) => {
    socket.to(data.accountId).emit("stoppedTyping", { roomId: data.roomId });
  });
  socket.on("disconnect", () => {
    socket.leave(socket.accountData.accountId);
    io.in(socket.accountData.accountId).clients((err, clients) => {
      controllerAccount.changeStatus(socket.accountData.accountId, clients, io);
      //console.log(clients);
    });
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/post/", postsRouter);
app.use("/api/account/", accountsRouter);
app.use("/api/comment/", commentsRouter);
app.use("/api/notification/", notificationRouter);
app.use("/api/chat/", chatRouter);

app.use((req, res, next) => {
  next(httpErrors(404));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});

module.exports = app;
