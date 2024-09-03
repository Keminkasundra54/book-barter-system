const Cart = require("../model/Cart-model");

exports.addToCart = async (req, res) => {
  try {
    const cartData = new Cart({
      user: req.headers.token,
      book: req.body.bookId,
      quantity: req.body.quantity,
    });
    const savedata = await cartData.save();
    if (savedata) {
      res.json({ message: "ok" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.getUserCart = async (req, res) => {
  try {
    const token = req.headers.token;
    const cartdata = await Cart.find({ user: token }).populate({
      path: "book",
      model: "book",
    });
    res.json({ message: "ok", data: cartdata });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.removeCart = async (req, res) => {
  try {
    const cartId = req.body._id;
    const rmdata = await Cart.findOneAndDelete({ _id: cartId });
    if (rmdata) {
      res.json({ message: "ok" });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.updateCart = async (req, res) => {
  try {
    const { cartId, qty } = req.body;
    const updateData = await Cart.findOneAndUpdate(
      { _id: cartId },
      { $set: { quantity: qty } },
      { new: true }
    );
    if (updateData) {
      res.json({ message: "ok" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
