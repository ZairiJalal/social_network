const express = require("express");
const router = express.Router();
const controllerComment = require("../controllers/controllerComment");
const Auth = require("../middleware/checkAuth");
const commentSchemaValidator = require("../middleware/schemaValidators/commentSchemaValidator");

router.get(
  "/getAllCommentsForPost/",
  Auth,
  commentSchemaValidator.getAllCommentsForPost,
  controllerComment.getAllCommentsForPost
);

router.get(
  "/getAllCommentRepliesForComment/",
  Auth,
  commentSchemaValidator.getAllCommentRepliesForComment,
  controllerComment.getAllCommentRepliesForComment
);

router.post(
  "/addNewComment/",
  Auth,
  commentSchemaValidator.addNewComment,
  controllerComment.addNewComment
);

router.post(
  "/addNewCommentReply/",
  Auth,
  commentSchemaValidator.addNewCommentReply,
  controllerComment.addNewCommentReply
);

router.get(
  "/getAllLikesForComment",
  Auth,
  commentSchemaValidator.getAllLikesForComment,
  controllerComment.getAllLikesForComment
);

router.get(
  "/getAllLikesForCommentReply",
  Auth,
  commentSchemaValidator.getAllLikesForCommentReply,
  controllerComment.getAllLikesForCommentReply
);

router.put(
  "/likeOneComment/",
  Auth,
  commentSchemaValidator.likeOneComment,
  controllerComment.likeOneComment
);

router.put(
  "/likeOneCommentReply/",
  Auth,
  commentSchemaValidator.likeOneCommentReply,
  controllerComment.likeOneCommentReply
);

module.exports = router;
