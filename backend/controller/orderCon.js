const { stat } = require("fs");
const Book = require("../model/book-model");
const RequestedBook = require("../model/bookRequest-model");
const Cart = require("../model/Cart-model");
const Order = require("../model/order-model");
const SellerOrder = require("../model/sellerOrder-model");
const SellerRequest = require("../model/sellerRequest-model");
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
    const neworderdata = await neworder.save();

    for (let i in cartData) {
      const newSellerOrder = await SellerOrder({
        book: cartData[i].book._id,
        quantity: cartData[i].quantity,
        seller: cartData[i].book.seller,
        order: neworderdata._id,
      });
      await newSellerOrder.save();
    }

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
exports.getSellerOrder = async (req, res) => {
  try {
    const token = req.headers.token;
    const sellerOrderData = await SellerOrder.find({ seller: token }).populate({
      path: "book",
    });
    res.json({ message: "ok", data: sellerOrderData });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
exports.getAllOrderData = async (req, res) => {
  try {
    let { month, year } = req.body;
    const monthNames = {
      January: 1,
      February: 2,
      March: 3,
      April: 4,
      May: 5,
      June: 6,
      July: 7,
      August: 8,
      September: 9,
      October: 10,
      November: 11,
      December: 12,
    };
    const monthNo = monthNames[month] || null;
    let orderData = await Order.find({
      $expr: {
        $and: [
          { $eq: [{ $month: "$createdAt" }, monthNo] },
          { $eq: [{ $year: "$createdAt" }, year] },
        ],
      },
    }).populate({ path: "userId" });

    for (let i in orderData) {
      const allseller = [];
      const sellerOrder = await SellerOrder.find({order: orderData[i]._id,}).populate({ path: "book" });

      for (let i in sellerOrder) {
        const seller = await User.findOne({ token: sellerOrder[i].seller });
        sellerOrder[i] = sellerOrder[i].toObject();
        sellerOrder[i]["seller"] = seller;
        allseller.push(sellerOrder[i]);
      }
      orderData[i] = orderData[i].toObject();
      orderData[i]["items"] = allseller;
    }

    // let orderData = await SellerOrder.find({}).populate({ path: "order" });
    // for (let i in orderData) {
    //
    // }
    res.json({ message: "ok", data: orderData });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
exports.updateOrder = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    const updatedata = await Order.findOneAndUpdate(
      { _id: orderId },
      { $set: { status: status } }
    );
    if (updatedata) {
      res.status(200).json({ message: "ok" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
exports.updateSellerStatus = async (req, res) => {
  try {
    const { sellerOrderId, status } = req.body;
    const updatedata = await SellerOrder.findOneAndUpdate(
      { _id: sellerOrderId },
      { $set: { status: status } }
    );
    if (updatedata) {
      res.status(200).json({ message: "ok" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

