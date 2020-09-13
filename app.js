require("dotenv").config();
const express = require("express");
const app = express();
const bodyparser=require('body-parser');
app.use(bodyparser.json());
const userRouter = require("./api/users/user.router");
const menuRouter=require("./api/menus/menus.route");
const orderRouter=require("./api/orders/orders.route");
app.use("/api/users", userRouter);
app.use("/api/menus", menuRouter);
app.use("/api/orders", orderRouter);
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("server up and running on PORT :", port);
});
