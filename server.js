const express = require("express");

const app = express();

const jwt = require("express-jwt");
const jwks = require("jwks-rsa");

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

app.get("/public", (req, res) => {
  res.status(200).send("Hello PUBLIC expenses!");
});

app.get("/private", jwtCheck, (req, res) => {
  res.status(200).send("Hello PRIVATE expenses!");
});

app.get("*", (req, res) => {
  res.sendStatus(404);
});

app.listen(3000, () => console.log("API running on port 3000"));