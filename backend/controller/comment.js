const Comment = require("../model/comment-model");
const User = require("../model/user-model");
const nodemailer = require("nodemailer");

exports.addComment = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const user = await User.findOne({ token: req.headers.token });
    const newComment = new Comment({
      name: name,
      email: email,
      message: message,
      user: user._id,
    });
    await newComment.save();

    res.status(200).json({ message: "ok" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
exports.getAllComment = async (req, res) => {
  try {
    const commentData = await Comment.find({}).populate({
      path: "user",
    });
    res.status(200).json({ message: "ok", data: commentData });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.addReplay = async (req, res) => {
  try {
    const token = req.headers.token;
    const admin = await User.findOne({ token: token });
    const { message, To } = req.body;
    const html = `hello user ${message}`;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: "varsha.hubresolution@gmail.com",
        pass: "sqhc vdpd uujr ynzj",
      },
    });
    const mailOptions = {
      from: admin.email,
      to: To,
      subject: "Regarding Feedback",
      html: html,
    };
    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log("mail has been send", info.response);
        res.status(200).json({ message: "ok" });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
