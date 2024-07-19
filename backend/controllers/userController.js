const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createUser, findUserByUsername } = require("../models/user");

const register = (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return res.status(500).send("Error creating user");
    createUser(username, hash, (err, userId) => {
      if (err) return res.status(500).send("Error creating user");
      res.status(201).send({ userId });
    });
  });
};

const login = (req, res) => {
  const { username, password } = req.body;
  findUserByUsername(username, (err, user) => {
    if (err || !user) return res.status(401).send("Invalid credentials");
    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        const token = jwt.sign({ userId: user.id }, "secretkey", {
          expiresIn: "1h",
        });
        res.status(200).send({ token });
      } else {
        res.status(401).send("Invalid credentials");
      }
    });
  });
};

module.exports = { register, login };
