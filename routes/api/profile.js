const express = require("express");
const router = express.Router();

const { check, validationResult } = require("express-validator/check");

const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route   GET api/profile/me
// @desc    Return current user
// @access  Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );

    if (!profile) {
      return res.status(400).json({ msg: "No profile is found" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   POST api/profile
// @desc    Create or update profile
// @access  Private
router.post(
  "/",
  [
    auth,
    [
      check("organization", "Organization is missing")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { organization, currenciesInUse, linkedin, twitter } = req.body;

    const profileFields = {};

    profileFields.user = req.user.id;

    if (organization) profileFields.organization = organization;
    if (currenciesInUse) {
      profileFields.currenciesInUse = currenciesInUse
        .split(",")
        .map(currency => currency.trim());
    }

    profileFields.social = {};
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (twitter) profileFields.social.twitter = twitter;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        // Update profile
        profile = Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
      }

      // Create profile
      profile = new Profile(profileFields);
      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   GET api/profile
// @desc    Get all profiles
// @access  Private

router.get("/", auth, async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user id
// @access  Private
router.get("/user/:user_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate("user", ["name", "avatar"]);

    if (!profile) return res.status(400).json({ msg: "Profile not found" });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(400).json({ msg: "Profile not found" });
    }
    res.status(500).send("Server error");
  }
});

// @route   DELETE api/profile
// @desc    Delete profile, user, posts
// @access  Private
router.delete("/", auth, async (req, res) => {
  try {
    // TODO: Delete user's posts

    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: "Profile deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   PUT api/profile/trips
// @desc    Add trips to profile
// @access  Private
router.put(
  "/trips",
  [
    auth,
    check("name", "Please enter the name of this trip")
      .not()
      .isEmpty(),
    check("country", "Please enter the country.")
      .not()
      .isEmpty(),
    check("currency", "Please enter the currency you used in this trip.")
      .not()
      .isEmpty(),
    check("from", "Please enter the start date of your trip")
      .not()
      .isEmpty(),
    check("to", "Please enter the end date of your trip")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, country, currency, from, to } = req.body;

    const newTrip = {
      name,
      country,
      currency,
      from,
      to
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      if (!profile) {
        return res.status(400).json({ msg: "Profile not found" });
      }
      profile.trips.unshift(newTrip);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
