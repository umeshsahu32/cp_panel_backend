const jwt = require("jsonwebtoken");

const ensureAuthenticated = async (req, res, next) => {
  const auth = req.headers["authorization"];

  if (!auth) {
    return res
      .status(403)
      .json({ message: "Unauthorized Access. Token is Required" });
  }

  try {
    const decoded = jwt.verify(auth, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Unauthorized Access. Token is wrong or expired" });
  }
};

module.exports = { ensureAuthenticated };
