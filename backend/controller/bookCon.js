const Book = require("../model/book-model");
var mongoose = require("mongoose");
const Like = require("../model/like-model");
const User = require("../model/user-model");

exports.addBook = async (req, res) => {
  try {
    const token = req.headers.token;
    const allfile = [];
    if (req.files) {
      for (let i in req.files) {
        allfile.push(req.files[i].filename);
      }
    }
    const jsondata = JSON.parse(req.body.bookdata);
    const myBook = new Book(jsondata);
    myBook.seller = token;
    myBook.images = allfile;
    await myBook.save();
    res.json({ message: "ok" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

exports.bookData = async (req, res) => {
  try {
    const bookData = await Book.find({});
    for (let i in bookData) {
      let users = [];
      const likeBy = await Like.find({ book: bookData[i]._id });
      for (let j in likeBy) {
        const obj = {
          userId: likeBy[j].user,
          bookId: likeBy[j].book,
        };
        users.push(obj);
      }
      bookData[i] = bookData[i].toObject();
      bookData[i]["likedBy"] = users;
    }
    res.json({ message: "ok", data: bookData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

exports.removeBook = async (req, res) => {
  try {
    const { _id } = req.body;
    const bookdata = await Book.findOne({ _id: _id });
    if (bookdata.image.length > 0) {
    }
    await Book.findOneAndDelete({ _id: _id });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.updateBook = async (req, res) => {
  try {
    const filenames = req.files ? req.files.map((file) => file.filename) : [];
    let jsondata = JSON.parse(req.body.bookdata);
    jsondata.seller = req.headers.token;
    const updatedata = await Book.findOneAndUpdate(
      { _id: req.body._id },
      { $set: jsondata },
      { new: true }
    );
    if (filenames.length > 0) {
      await Book.updateOne(
        { _id: req.body._id },
        { $addToSet: { images: { $each: filenames } } }
      );
    }
    if (updatedata) {
      res.json({ message: "Update successful" });
    } else {
      res.status(400).json({ message: "Update failed. Please try again." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getUserSellBook = async (req, res) => {
  try {
    const token = req.headers.token;
    const userbook = await Book.find({ seller: token });
    res.json({ message: "ok", data: userbook });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.getBookByCategory = async (req, res) => {
  try {
    const categoryId = req.body.categoryId;
    const bookdata = await Book.find({ category: categoryId });
    res.json({ message: "ok", data: bookdata });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getOneBook = async (req, res) => {
  try {
    const { bookId } = req.body;
    const bookData = await Book.findOne({ _id: bookId });
    res.status(200).json({ message: "ok", data: bookData });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.getBookByFilter = async (req, res) => {
  try {
    const { maxValue, minValue, categoryId, condition, isDonate } = req.body;
    let query = {};

    if (maxValue != null && minValue != null) {
      query.price = { $gte: minValue, $lte: maxValue };
    }
    if (categoryId != null && categoryId != "") {
      var objectId = new mongoose.Types.ObjectId(categoryId);
      query.category = objectId;
    }
    if (condition != null && condition != "") {
      query.condition = condition;
    }

    if (isDonate == true) {
      query.radio = "donate";
    }
    let bookData = await Book.find(query);
    res.status(200).json({ message: "ok", data: bookData });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.likeBook = async (req, res) => {
  try {
    const token = req.headers.token;
    const userdata = await User.findOne({ token: token });
    const likedata = new Like({
      book: req.body.bookId,
      user: userdata._id,
    });
    const savedata = await likedata.save();
    if (savedata) {
      res.status(200).json({ message: "ok" });
    }
  } catch (err) {
    console.log(err);
    res.status(500), json(err);
  }
};

exports.disLikeBook = async (req, res) => {
  try {
    const token = req.headers.token;
    const user = await User.findOne({ token: token });
    const removeLike = await Like.findOneAndDelete({
      user: user._id,
      book: req.body.bookId,
    });
    if (removeLike) {
      res.status(200).json({ message: "ok" });
    } else {
      res.status(400).json({ message: "try again" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
