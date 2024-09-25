const RequestedBook = require("../model/bookRequest-model");
const Order = require("../model/order-model");

exports.getAllRequestedOrder = async (req, res) => {
  try {
    const allData = await Order.find({ status: { $ne: "Delivered" } });
    res.json({ message: "ok", data: allData });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
exports.getAllDeliverOrder = async (req, res) => {
  try {
    const allData = await Order.find({ status: "Delivered" });
    res.json({ message: "ok", data: allData });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
exports.getAllDonatedRequest = async (req, res) => {
  try {
    const allData = await RequestedBook.find({ status: "Pending" });
    res.json({ message: "ok", data: allData });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
exports.getAllDonated = async (req, res) => {
  try {
    const allData = await RequestedBook.find({ status: { $ne: "Pending" } });
    res.json({ message: "ok", data: allData });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
