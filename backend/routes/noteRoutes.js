const express = require("express");
const { addNote, getNotes } = require("../controllers/noteController");
const { authenticate } = require("../middleware/auth");
const router = express.Router();

router.post("/notes", authenticate, addNote);
router.get("/notes", authenticate, getNotes);

module.exports = router;
