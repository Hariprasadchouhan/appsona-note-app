const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");
const app = express();

app.use(bodyParser.json());
app.use("/api", userRoutes);
app.use("/api", noteRoutes);

module.exports = app;
