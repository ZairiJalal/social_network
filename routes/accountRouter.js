const express = require("express");
const router = express.Router();
const controllerAccount = require("../controllers/controllerAccount");
const Auth = require("../middleware/checkAuth");
const checkAccount = require("../middleware/checkAccount");
const accountSchemaValidator = require("../middleware/schemaValidators/accountSchemaValidator");
const checkCredentials = require("../middleware/checkCredentials");

router.post(
  "/signup", 
  accountSchemaValidator.addAccount, 
  controllerAccount.addAccount
);

router.post(
  "/login",
  accountSchemaValidator.loginAccount,
  checkCredentials,
  controllerAccount.loginAccount,
  controllerAccount.sendAccountData
);

router.post(
  "/resetpassword",
  Auth,
  accountSchemaValidator.resetPassword,
  controllerAccount.resetPassword
);

router.get(
  "/getAccountData",
  Auth,
  accountSchemaValidator.getAccountData,
  controllerAccount.getAccountData,
  controllerAccount.getAccountPosts,
  controllerAccount.sendAccountData
);

router.get(
  "/getPosts",
  Auth,
  accountSchemaValidator.getPosts,
  controllerAccount.getPosts
);

router.post(
  "/getAccountProfileData",
  Auth,
  accountSchemaValidator.getAccountProfileData,
  controllerAccount.getAccountProfileData,
  controllerAccount.getAccountPosts,
  controllerAccount.sendAccountData
);

router.post(
  "/getAccountProfileFollowers",
  Auth,
  accountSchemaValidator.getAccountProfileFollowers,
  controllerAccount.getAccountProfileFollowers
);

router.post(
  "/getAccountProfileFollowings",
  Auth,
  accountSchemaValidator.getAccountProfileFollowings,
  controllerAccount.getAccountProfileFollowings
);

router.post(
  "/changeAccountProfilePicture",
  Auth,
  controllerAccount.changeAccountProfilePicture
);

router.post(
  "/updateAccount",
  Auth,
  accountSchemaValidator.updateAccount,
  controllerAccount.updateAccount
);

router.post(
  "/searchAccountsByUsername",
  Auth,
  accountSchemaValidator.searchAccountsByUsername,
  controllerAccount.searchAccountsByUsername
);

router.post(
  "/followAccount",
  Auth,
  accountSchemaValidator.followAccount,
  checkAccount,
  controllerAccount.followAccount
);

router.delete(
  "/deleteAccount/", 
  Auth,
  controllerAccount.deleteAccount
);

module.exports = router;
