const db = require("../config/db");

const createNote = (
  userId,
  title,
  content,
  tags,
  color,
  reminder,
  callback
) => {
  db.run(
    `INSERT INTO notes (userId, title, content, tags, color, reminder) VALUES (?, ?, ?, ?, ?, ?)`,
    [userId, title, content, tags, color, reminder],
    function (err) {
      callback(err, this.lastID);
    }
  );
};

const getNotesByUser = (userId, callback) => {
  db.all(
    `SELECT * FROM notes WHERE userId = ? AND trashed = 0`,
    [userId],
    callback
  );
};

module.exports = { createNote, getNotesByUser };
