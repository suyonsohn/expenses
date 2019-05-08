const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');

const User = require('../../models/User');

// @route   POST api/auth
// @desc    Authenticate user
// @access  Public
router.post('/',
  [
    check('email', 'Please enter your email').isEmail(),
    check('password', 'Please enter your password').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      res.json({ msg: 'User is authenticated' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });

module.exports = router;