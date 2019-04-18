const express = require("express");
const router = require("express-promise-router")();
const passport = require("passport");
const passportConf = require("../passport");

const { validateBody, schemas } = require("../helpers/routeHelpers");
const UsersController = require("../controllers/users");
const passportLogin = passport.authenticate("local", {
  session: false,
  failureFlash: true
});
const passportSecret = passport.authenticate("jwt", { session: false });
const passportGoogle = passport.authenticate("googleToken", { session: false });

router
  .route("/register")
  .post(validateBody(schemas.authSchema), UsersController.register);

router
  .route("/login")
  .post(
    validateBody(schemas.loginSchema),
    passportLogin,
    UsersController.login
  );

router.route("/oauth/google").post(passportGoogle, UsersController.googleOAuth);

router.route("/secret").get(passportSecret, UsersController.secret);

module.exports = router;
