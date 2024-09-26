const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const path = require("path");
require("./database/db");

app.use(express.static(path.join(__dirname, "./upload/categoryimage")));
app.use(express.static(path.join(__dirname, "./upload/bookimage")));
app.use(express.static(path.join(__dirname, "./upload/profile")));

const routes = require("./routes/routes");
const bookRoutes = require("./routes/book-route");
const cartRoutes = require("./routes/cart-route");
const categoryRoutes = require("./routes/category-route");
const orderRoutes = require("./routes/order-route");
const adminRoutes = require("./routes/admin-route");
const requestRoutes = require("./routes/request-route");
const commentRoutes = require("./routes/comment-route");

app.use(
  "/",
  routes,
  bookRoutes,
  cartRoutes,
  categoryRoutes,
  orderRoutes,
  adminRoutes,
  requestRoutes,
  commentRoutes
);

app.listen(5000, () => console.log("app run on 5000 port"));
