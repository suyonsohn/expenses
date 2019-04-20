const express = require('express');
const router = express.Router();

// @route   GET api/expenses/test
// @desc    Test expenses route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Expenses test works!' }));

module.exports = router;