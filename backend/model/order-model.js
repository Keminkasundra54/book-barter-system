var mongoose = require("mongoose");
const { Schema } = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    totalAmount: {
      type: Number,
      default: null,
    },
    paymentMethod: {
      type: String,
      default: "Cash",
    },
    paymentStatus: {
      type: String,
      default: "Pending",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    token: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Requested",
    },
    promoCode: {
      type: String,
      default: null,
    },
    address: {
      type: String,
      default: null,
    },
    items: {
      type: Object,
      required: true,
    },
    orderNo: {
      type: Number,
    },
    trakingNO: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order = new mongoose.model("Order", orderSchema);
module.exports = Order;
