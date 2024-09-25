const Book = require("../model/book-model");
const RequestedBook = require("../model/bookRequest-model");
const SellerRequest = require("../model/sellerRequest-model");
const User = require("../model/user-model");



exports.addBookRequest = async (req, res) => {
    try {
      let { street, city, state, zip, country } = req.body;
      const myData = await RequestedBook.find({});
  
      const book = await Book.findOne({ _id: req.body.book });
      const seller = await User.findOne({ token: book.seller });
      let address = street + "," + city + "," + state + "," + zip + "," + country;
      const newRequest = new RequestedBook(req.body);
      newRequest.orderNo = myData.length + 1;
      newRequest.address = address;
      newRequest.seller = seller._id;
      const neworderdata = await newRequest.save();
  
      const newSellerOrder = await SellerRequest({
        book: book._id,
        quantity: 1,
        seller: seller._id,
        request: neworderdata._id,
      });
      await newSellerOrder.save();
  
      res.json({ message: "ok" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  };
  exports.getRequestedBook = async (req, res) => {
    try {
      const user = await User.findOne({ token: req.headers.token });
      let myData = [];
      if (user != null) {
        myData = await RequestedBook.find({ user: user._id }).populate({
          path: "book",
          ref: "book",
        });
      }
      res.json({ message: "ok", data: myData });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  };
  exports.getAllDonateBook = async (req, res) => {
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
      let orderData = await RequestedBook.find({
        $expr: {
          $and: [
            { $eq: [{ $month: "$createdAt" }, monthNo] },
            { $eq: [{ $year: "$createdAt" }, year] },
          ],
        },
      }).populate({ path: "user" });
      console.log(orderData);
      for (let i in orderData) {
        const sellerOrder = await SellerRequest.find({
          request: orderData[i]._id,
        })
          .populate({ path: "book" })
          .populate({ path: "seller" });
        orderData[i] = orderData[i].toObject();
        orderData[i]["items"] = sellerOrder;
      }
      res.json({ message: "ok", data: orderData });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  };
  exports.updateRequest = async (req, res) => {
    try {
      const { _id, status } = req.body;
      const updatedata = await RequestedBook.findOneAndUpdate(
        { _id: _id },
        { $set: { status: status } },
        { new: true }
      );
      if (updatedata) {
        res.json({ message: "ok", data: updatedata });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  };
  exports.updateSellerRequest = async (req, res) => {
    try {
      const { _id, status } = req.body;
      const updatedata = await SellerRequest.findOneAndUpdate(
        { _id: _id },
        { $set: { status: status } }
      );
      res.json({ message: "ok" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  };