const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).send("Access denied");
  jwt.verify(token, "secretkey", (err, decoded) => {
    if (err) return res.status(401).send("Invalid token");
    req.user = decoded;
    next();
  });
};

module.exports = { authenticate };
