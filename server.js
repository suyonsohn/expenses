const express = require('express');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const mongoose = require('mongoose');

const auth = require('./routes/api/auth');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const expenses = require('./routes/api/expenses');

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
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Init Middleware
// Tell the parser we want values to be only strings or arrays
app.use(express.json({ extended: false }));

app.get('/public', (req, res) => {
  res.status(200).send('Hello PUBLIC expenses!');
});

app.get('/private', jwtCheck, (req, res) => {
  res.status(200).send('Hello PRIVATE expenses!');
});

// Use Routes
app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/expenses', expenses);

app.get('*', (req, res) => {
  res.sendStatus(404);
});

const port = process.env.port || 3000;

app.listen(port, () => console.log(`API running on port ${port}`));