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
const bookroutes = require("./routes/book-route");
const cartroutes = require("./routes/cart-route");
const categoryroutes = require("./routes/category-route");
const orderoutes = require("./routes/order-route");
const adminroutes = require("./routes/admin-route");
const requestroute = require("./routes/request-route");

app.use("/",routes,bookroutes,cartroutes,categoryroutes,orderoutes,adminroutes,requestroute);

app.listen(5000, () => console.log("app run on 5000 port"));
