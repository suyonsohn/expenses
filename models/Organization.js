const mongoose = require('mongoose');

const OrganizationSchema = mongoose.Schema({
  name: {
    type: String
  },
  address: {
    type: String
  },
  defaultCurrency: {
    type: String,
    default: 'CAD'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Organization = mongoose.model('organization', OrganizationSchema);