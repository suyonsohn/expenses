const express = require("express");

const app = express();

app.get("/public", (req, res) => {
  res.status(200).send("Hello PUBLIC expenses!");
});

app.get("/private", (req, res) => {
  res.status(200).send("Hello PRIVATE expenses!");
});

app.get("*", (req, res) => {
  res.sendStatus(404);
});

app.listen(3000, () => console.log("API running on port 3000"));