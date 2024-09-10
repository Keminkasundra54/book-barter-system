const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const sellerOrderSchema = new mongoose.Schema(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "book",
      require: true,
    },
    seller: {
      type: String,
      trim: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    status: {
      type: String,
      default: "Requested",
    },
    order: {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  },
  {
    timestamps: true,
  }
);

const SellerOrder = new mongoose.model("sellerOrder", sellerOrderSchema);
module.exports = SellerOrder;
