const express = require("express");
const { ensureAuthenticated } = require("../Middlewares/UserAuth");

const router = express.Router();

router.get("/", ensureAuthenticated, (req, res) => {
  res.status(200).json({
    name: "Mobile",
    price: "10000",
  });
});

module.exports = router;
