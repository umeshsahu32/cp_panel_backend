//  ! IMPORTS
const express = require("express");
const controller = require("../Controllers/ProfileController");
const { ensureAuthenticated } = require("../Middlewares/UserAuth");
const router = express.Router();

// $ COUNT       --> 1
// $ DESCRIPTION --> CREATE USER PROFILE
// $ ROUTE       --> profile/create-user-profile
// $ METHOD      --> post

router.post(
  "/create-user-profile",
  ensureAuthenticated,
  async function (req, res, next) {
    const result = await controller.CreateUserProfile(req);
    res.send(result);
  }
);

// @ COUNT       --> 2
// @ DESCRIPTION --> GET USER PROFILE
// @ ROUTE       --> profile/get-user-profile
// @ METHOD      --> get
router.get(
  "/get-user-profile/:id",
  ensureAuthenticated,
  async function (req, res, next) {
    const result = await controller.GetUserProfile(req);
    res.send(result);
  }
);

module.exports = router;
