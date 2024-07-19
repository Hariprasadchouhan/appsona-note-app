const db = require("../config/db");

const createUser = (username, password, callback) => {
  db.run(
    `INSERT INTO users (username, password) VALUES (?, ?)`,
    [username, password],
    function (err) {
      callback(err, this.lastID);
    }
  );
};

const findUserByUsername = (username, callback) => {
  db.get(`SELECT * FROM users WHERE username = ?`, [username], callback);
};

module.exports = { createUser, findUserByUsername };
