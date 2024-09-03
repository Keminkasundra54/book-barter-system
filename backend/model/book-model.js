const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      maxlength: 50,
    },
    page: {
      type: Number,
      require: true,
      minlength: 1,
    },
    category: {
      type: mongoose.Schema.ObjectId,
    },
    author: {
      type: String,
    },
    condition: {
      type: String, // old - new
      require: true,
    },
    price: {
      type: Number,
      default: 0,
    },
    quantity: {
      type: Number,
      require: true,
    },
    publicationYear: {
      type: Number,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    radio: {
      type: String,
    },
    seller: {
      type: String,
      default: null,
    },
    address: {
      type: String,
      require: true,
    },
    images: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

const Book = new mongoose.model("book", bookSchema);
module.exports = Book;
