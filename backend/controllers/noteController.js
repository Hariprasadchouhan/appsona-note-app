const { createNote, getNotesByUser } = require("../models/note");

const addNote = (req, res) => {
  const { userId } = req.user;
  const { title, content, tags, color, reminder } = req.body;
  createNote(userId, title, content, tags, color, reminder, (err, noteId) => {
    if (err) return res.status(500).send("Error adding note");
    res.status(201).send({ noteId });
  });
};

const getNotes = (req, res) => {
  const { userId } = req.user;
  getNotesByUser(userId, (err, notes) => {
    if (err) return res.status(500).send("Error retrieving notes");
    res.status(200).send(notes);
  });
};

module.exports = { addNote, getNotes };
