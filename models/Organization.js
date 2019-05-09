const mongoose = require('mongoose');

const OrganizationSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  name: {
    type: String
  },
  address: {
    type: String
  },
  defaultCurrency: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Organization = mongoose.model('organization', OrganizationSchema);