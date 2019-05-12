const mongoose = require("mongoose");

const ProfileSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  organization: {
    type: String,
    required: true
  },
  currenciesInUse: {
    type: [String]
  },
  trips: [
    {
      name: {
        type: String,
        required: true
      },
      country: {
        type: String,
        required: true
      },
      currency: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date,
        required: true
      }
    }
  ],
  social: {
    linkedin: {
      type: String
    },
    twitter: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
