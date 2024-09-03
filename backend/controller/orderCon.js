const Book = require("../model/book-model");
const Cart = require("../model/Cart-model");
const Order = require("../model/order-model");
const User = require("../model/user-model");
const { v4: uuidv4 } = require("uuid");

exports.addOrder = async (req, res) => {
  try {
    const { address, cartData, totalAmount } = req.body;
    const { token } = req.headers;
    const randomString = uuidv4().replace(/-/g, "");

    const alldata = [];
    for (let i in cartData) {
      const cartItems = {
        book: cartData[i].book._id,
        quantity: cartData[i].quantity,
      };
      alldata.push(cartItems);

      const newdata = await Book.findOneAndUpdate(
        { _id: cartData[i].book._id },
        { $inc: { quantity: -cartData[i].quantity } },
        { new: true }
      );
      await Cart.findOneAndDelete({ _id: cartData[i]._id });
    }

    const user = await User.findOne({ token: token });
    const order = await Order.find({});
    const orderNo = Number(order.length) + 1;
    const neworder = new Order({
      address: address,
      userId: user._id,
      token: token,
      totalAmount: totalAmount,
      items: alldata,
      orderNo: orderNo,
      trakingNO: randomString,
    });
    await neworder.save();
    res.status(200).json({ message: "ok" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
exports.getUserOrder = async (req, res) => {
  try {
    const token = req.headers.token;
    const userOrderData = await Order.find({ token: token });
    res.json({ message: "ok", data: userOrderData });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
exports.getOrderDetail = async (req, res) => {
  try {
    const orderId = req.body.orderId;
    const order = await Order.findOne({ _id: orderId });

    for (let i in order.items) {
      const book = await Book.findOne({ _id: order.items[i].book });
      order.items[i].book = book;
    }
    res.json({ message: "ok", data: order });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};