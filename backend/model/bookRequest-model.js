const mongoose = require("mongoose");

const bookRequestSchema = new mongoose.Schema(
  {
    book: {
      type: mongoose.Schema.ObjectId,
      ref: "book",
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    quantity: {
      type: Number,
      default: 1,
    },
    orderNo: {
      type: Number,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const RequestedBook = new mongoose.model("RequestedBook", bookRequestSchema);
module.exports = RequestedBook;
