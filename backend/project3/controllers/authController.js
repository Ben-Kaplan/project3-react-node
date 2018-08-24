const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const passport = require("passport");
// register route
router.post("/register", async (req, res) => {
  try {
    console.log("posting to route");
    const createdUser = await User.create(req.body);
    console.log(createdUser);
    res.json({
      status: 200,
      data: createdUser
    });
    req.session.loggedIn = true;
  } catch (err) {
    res.send(err);
  }
});
// login route
router.post("/login", async (req, res, next) => {
    const passportCallback = await passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.json({
            status: 200,
            data: "login Succesful"
        }) }
        req.logIn(user, function(err) {
          if (err) { return next(err); }
          return res.json({
              status: 400,
              data: err
          });
        });
      })(req, res, next);
});
router.get("/google", passport.authenticate("google", {scope: ["https://www.googleapis.com/auth/plus.login"]}));

router.get(
  "/google/callback",
  passport.authenticate("google"),
  function(req, res) {
    res.json({
        status: 200,
        data: "login Successful"
    });
  }
);

module.exports = router;