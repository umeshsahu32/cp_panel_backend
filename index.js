const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const AuthRouter = require("./Routes/AuthRouter");
const ProfileRouter = require("./Routes/ProfileRoute");
const WebScraperRouter = require("./Routes/WebScraperRouter");
const colors = require("colors");

const app = express();
dotenv.config();

const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());

app.use("/auth", AuthRouter);
app.use("/profile", ProfileRouter);
app.use("/web", WebScraperRouter);

app.listen(PORT, () => {
  console.log(`Server is Running at port ${PORT}`.red.bold);
});
