const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const sellerRequestSchema = new mongoose.Schema(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "book",
      require: true,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    quantity: {
      type: Number,
      default: 1,
    },
    status: {
      type: String,
      default: "Requested",
    },
    request: {
      type: Schema.Types.ObjectId,
      ref: "RequestedBook",
    },
  },
  {
    timestamps: true,
  }
);

const SellerRequest = new mongoose.model("sellerRequest", sellerRequestSchema);
module.exports = SellerRequest;
