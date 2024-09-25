const User = require("../model/user-model");
const Book = require("../model/book-model");
const Category = require("../model/category-model");
const Cart = require("../model/Cart-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const fs = require("fs");
require("dotenv").config();

exports.register = async (req, res) => {
  try {
    const newuser = new User(req.body);
    await newuser.generateAuthToken();
    const data = await newuser.save();
    res.json({ Message: "ok", data: data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const token = req.headers.token;
    console.log(token);
    const userdata = await User.findOne({ token: token });
    if (userdata) {
      res.json({ message: "ok", data: userdata });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const token = req.headers.token;
    const jsondata = JSON.parse(req.body.userdata);
    if (req.file) {
      jsondata.profile = req.file.filename;
    }
    const updateuser = await User.findOneAndUpdate(
      { token: token },
      { $set: jsondata },
      { new: true }
    );
    if (updateuser) {
      res.json({ message: "ok", data: updateuser });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const myuser = await User.findOne({ email: email });
    if (myuser) {
      const checkpassword = await bcrypt.compare(password, myuser.password);
      if (checkpassword) {
        res.json({ message: "ok", data: myuser });
      } else {
        res.status(404).json({ message: "please enter valid detail" });
      }
    } else {
      res.status(404).json({ message: "please enter valid detail" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const sendsetpass = async (firstname, email, token) => {
  try {
    const payload = { email: email };
    const secret = process.env.ResetPasswordKey;
    const options = { expiresIn: "1h" };

    const mytoken = jwt.sign(payload, secret, options);
    const html = `<p>Hello ${firstname}</p>
    <p>We received a request to reset the password for your account associated with this email address.</p>
    <p>To reset your password, please click the link below:</p>
    <p><a href="${process.env.NEWPASSPAGE}/${email}/${mytoken}" target="_self" rel="noopener noreferrer" >Reset Password</a></p>
    <p>If you did not request a password reset, please ignore this email. Your password will remain unchanged.</p>
    <p>For security reasons, this link will expire in 1 Hour.</p>
    <p>If you have any questions or need further assistance, please contact our support team.</p>
    <p>Thank you,</p>
    <p>Book Barter System Private Limited<br>
    Support Team<br>
    <a href="mailto:bookbarter@gmail.com">bookbarter@gmail.com</a><br>
    </p>`;

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
      from: "varsha.hubresolution@gmail.com",
      to: email,
      subject: "for reset password",
      html: html,
    };
    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log("mail has been send", info.response);
      }
    });
  } catch (err) {
    return err;
  }
};

exports.frgtpassword = async (req, res) => {
  try {
    const email = req.body.email;
    const userdata = await User.findOne({ email: email });

    if (userdata) {
      const token = userdata.token;

      await sendsetpass(userdata.firstname, userdata.email, token);
      return res.json({ message: "OK", data: "check your email" });
    } else {
      res.status(400).json("invalid email address");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.resetpass = async (req, res) => {
  try {
    const password = req.body.password;
    const email = req.body.email;
    const secret = process.env.ResetPasswordKey;
    const user = jwt.verify(req.body.token, secret);

    let timestamp = Date.now();
    let seconds = Math.floor(timestamp / 1000);

    if (seconds > user.exp) {
      res.status(401).json("this link has been expired");
    } else {
      const userdata = await User.findOne({ email: email });
      userdata.password = password;
      await userdata.save();
      return res.json({ message: "OK", data: "reset password" });
    }
  } catch (err) {
    console.log(err);
    if (err.name === "TokenExpiredError") {
      res.status(401).json("this link has been expired");
    } else {
      res.status(500).json(err);
    }
  }
};
