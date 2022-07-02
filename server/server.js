require('dotenv').config();
const express = require("express");
const ProductRouter = require("./routes/product");
const UserRouter = require("./routes/user");
const SecurityRouter = require("./routes/security");
const PostRouter = require("./routes/post");
const LogRouter = require('./routes/log');
const verifyToken = require("./middlewares/verifyToken");
const { GlobalLogger } = require("./lib/logger");
const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.get("/", (req, res, next) => {
  next();
  res.json({
    title: "coucou",
  });
});

app.use("/", SecurityRouter, LogRouter);

app.use("/api", verifyToken, ProductRouter, UserRouter, PostRouter);

app.use((req, res, next) => {
    res.sendStatus(500);
    GlobalLogger(req)
})

module.exports = app;