const express = require("express");
const jwt = require("express-jwt");
const jwks = require("jwks-rsa");
const mongoose = require("mongoose");

const app = express();

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://dev--yscf3ip.auth0.com/.well-known/jwks.json'
  }),
  audience: 'expenses-api',
  issuer: 'https://dev--yscf3ip.auth0.com/',
  algorithms: ['RS256']
});

// DB config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.get("/public", (req, res) => {
  res.status(200).send("Hello PUBLIC expenses!");
});

app.get("/private", jwtCheck, (req, res) => {
  res.status(200).send("Hello PRIVATE expenses!");
});

app.get("*", (req, res) => {
  res.sendStatus(404);
});

const port = process.env.port || 3000;

app.listen(port, () => console.log(`API running on port ${port}`));