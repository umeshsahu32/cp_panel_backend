//  ! IMPORTS
const express = require("express");
const controller = require("../Controllers/AuthController");
const {
  signupValidation,
  loginValidation,
  updatePasswordValidation,
  emailValidation,
  otpValidation,
} = require("../Middlewares/AuthValidation");

const { ensureAuthenticated } = require("../Middlewares/UserAuth");

const router = express.Router();

// // @ COUNT       --> 1
// // @ DESCRIPTION --> User Login
// // @ ROUTE       --> auth/login
// // @ METHOD      --> POST
router.post("/login", loginValidation, async function (req, res, next) {
  const result = await controller.login(req);
  res.send(result);
});

// // # COUNT       --> 2
// // # DESCRIPTION --> User Signup
// // # ROUTE       --> auth/signup
// // # METHOD      --> POST
router.post("/signup", signupValidation, async function (req, res, next) {
  const result = await controller.signup(req);
  res.send(result);
});

// // $ COUNT       --> 3
// // $ DESCRIPTION --> Change User Password
// // $ ROUTE       --> auth/update-password
// // $ METHOD      --> put
router.put(
  "/update-password",
  updatePasswordValidation,
  ensureAuthenticated,
  async function (req, res, next) {
    const result = await controller.updatePassword(req);
    res.send(result);
  }
);

// // ! COUNT       --> 4
// // ! DESCRIPTION --> Send OTP to user email
// // ! ROUTE       --> auth/send-otp
// // ! METHOD      --> POST
router.post("/send-otp", emailValidation, async function (req, res, next) {
  const result = await controller.sendOtp(req);
  res.send(result);
});

// // @ COUNT       --> 5
// // @DESCRIPTION --> reset user password
// // @ ROUTE      --> auth/reset-password
// // @ METHOD     --> PUT
router.put("/reset-password", otpValidation, async function (req, res, next) {
  const result = await controller.resetPassword(req);
  res.send(result);
});

module.exports = router;
