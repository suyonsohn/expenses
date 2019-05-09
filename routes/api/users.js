const express = require("express");
const router = express.Router();

const { check, validationResult } = require("express-validator/check");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/User");
const privateKey = require("../../config/keys").privateKey;

// @route   POST api/users
// @desc    Register users
// @access  Public
router.post(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please enter your email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // Check if user exists
      let user = await User.findOne({ email });
      if (user) {
        res.status(400).json({ errors: [{ msg: "This user already exists" }] });
      }

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      // Get user's gravatar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "g",
        d: "robohash"
      });

      // Create a new user
      user = new User({
        name,
        email,
        password: hash,
        avatar
      });
      await user.save();

      // Return JWT
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(payload, privateKey, { expiresIn: "1h" }, (err, token) => {
        if (err) throw err;
        res.json(token);
      });

      // TODO: Fix MongoDB DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
