const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    jwt.verify(token, process.env.SECRET_KEY);
    next();
  } catch (err) {
    res.send(err);
  }
};
module.exports = auth;
