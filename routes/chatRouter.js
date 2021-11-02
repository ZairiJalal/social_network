const express = require("express");
const router = express.Router();
const controllerChat = require("../controllers/controllerChat");
const Auth = require("../middleware/checkAuth");
const notificationSchemaValidator = require("../middleware/schemaValidators/notificationSchemaValidator");
const checkRoom = require("../middleware/checkRoom");

router.get(
  "/getAllChatRooms/",
 Auth, 
 controllerChat.getAllChatRooms
 );

router.get(
  "/getAllMessagesForRoom",
  Auth,
  notificationSchemaValidator.getAllMessagesForRoom,
  controllerChat.getAllMessagesForRoom
);

router.post(
  "/sandNewImage",
  Auth,
  notificationSchemaValidator.sandNewImage,
  checkRoom,
  controllerChat.sandNewImage
);

router.post(
  "/sendNewMessage",
  Auth,
  notificationSchemaValidator.sendNewMessage,
  checkRoom,
  controllerChat.sendNewMessage
);

router.put(
  "/readMessages",
  Auth,
  notificationSchemaValidator.readMessages,
  checkRoom,
  controllerChat.readMessages
);

module.exports = router;
