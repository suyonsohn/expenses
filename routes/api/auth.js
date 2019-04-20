const express = require('express');
const router = express.Router();

// @route   GET api/auth/test
// @desc    Test auth route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Auth test works!' }));

module.exports = router;