const express = require("express");
const router = express.Router();
const controllerPost = require("../controllers/controllerPost");
const controllerAccount = require("../controllers/controllerAccount");
const Auth = require("../middleware/checkAuth");
const postSchemaValidator = require("../middleware/schemaValidators/postSchemaValidator");

router.get(
  "/getAllPosts",
  Auth,
  postSchemaValidator.getAllPosts,
  controllerAccount.getFollowings,
  controllerPost.getAllPosts
);

router.get(
  "/getOnePost",
  Auth,
  postSchemaValidator.getOnePost,
  controllerPost.getOnePost
);

router.get(
  "/getLikesPost",
  Auth,
  postSchemaValidator.getLikesPost,
  controllerPost.getLikesPost
);

router.post(
  "/addNewPost",
  Auth,
  postSchemaValidator.addNewPost,
  controllerPost.addNewPost
);

router.put(
  "/likeOnePost/",
  Auth,
  postSchemaValidator.likeOnePost,
  controllerPost.likeOnePost
);

router.delete(
  "/removePost/",
  Auth,
  postSchemaValidator.removePost,
  controllerPost.removePost
);

module.exports = router;
