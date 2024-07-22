//  ! IMPORTS
const express = require("express");

const { FetchContent } = require("../Controllers/WebScraperController");

const router = express.Router();

router.post("/get-web-content", FetchContent);

module.exports = router;
