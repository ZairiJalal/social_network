const express = require("express");
const router = express.Router();
const controllerNotification = require("../controllers/controllerNotification");
const Auth = require("../middleware/checkAuth");
const notificationSchemaValidator = require("../middleware/schemaValidators/notificationSchemaValidator");

router.put(
  "/read/",
  Auth,
  notificationSchemaValidator.read,
  controllerNotification.read
);

router.get(
  "/get/",
  Auth,
  notificationSchemaValidator.get,
  controllerNotification.get
);

module.exports = router;
