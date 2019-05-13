const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReceiptSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  business: {
    name: {
      type: String
    },
    location: {
      type: String
    }
  },
  expenseDate: {
    type: Date,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  items: [
    {
      name: {
        type: String
      },
      price: {
        type: Number
      },
      unit: {
        type: Number
      },
      taxRate: {
        type: Number
      }
    }
  ],
  total: {
    type: Number
  },
  currency: {
    type: String,
    required: true
  },
  note: {
    type: String
  },
  checkMark: {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user"
    }
  },
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "user"
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  uploadedDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = Receipt = mongoose.model("receipt", ReceiptSchema);
