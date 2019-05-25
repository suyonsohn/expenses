const express = require("express");
const router = express.Router();

const { check, validationResult } = require("express-validator/check");

const auth = require("../../middleware/auth");

const Receipt = require("../../models/Receipt");
const User = require("../../models/User");
const Profile = require("../../models/Profile");

// @route   POST api/receipts
// @desc    Create a receipt
// @access  Private
router.post(
  "/",
  [
    auth,
    check("expenseDate", "The date you spent this expense is required")
      .not()
      .isEmpty(),
    check("type", "Please enter the type of this expense")
      .not()
      .isEmpty(),
    check("currency", "Please enter the currency")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      businessName,
      businessLocation,
      expenseDate,
      type,
      total,
      currency,
      note
    } = req.body;

    try {
      const newReceipt = new Receipt({
        user: req.user.id,
        business: {
          name: businessName,
          location: businessLocation
        },
        expenseDate,
        type,
        total,
        currency,
        note
      });

      const receipt = await newReceipt.save();

      res.json(receipt);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   PUT api/receipts/checkmark/:id
// @desc    Add check mark
// @access  Private
router.put("/checkmark/:id", auth, async (req, res) => {
  try {
    const receipt = await Receipt.findById(req.params.id);
    if (
      receipt.checkMarks.filter(
        checkMark => checkMark.user.toString() === req.user.id
      ).length > 0
    ) {
      return res
        .status(400)
        .json({ msg: "You have already checked this receipt" });
    }

    receipt.checkMarks.unshift({ user: req.user.id });
    await receipt.save();
    res.json(receipt.checkMarks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
