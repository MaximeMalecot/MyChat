require('dotenv').config();
const express = require("express");
const ProductRouter = require("./routes/product");
const UserRouter = require("./routes/user");
const SecurityRouter = require("./routes/security");
const PostRouter = require("./routes/post");
const LogRouter = require('./routes/log');
const AnalyticsRouter = require('./routes/analytics');
const verifyToken = require("./middlewares/verifyToken");
const { GlobalLogger } = require("./lib/logger");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: "http://localhost:8000",
    credentials: true
  })
)
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

app.use("/", SecurityRouter, LogRouter, AnalyticsRouter);

app.use("/api", verifyToken, ProductRouter, UserRouter, PostRouter);

app.use((req, res, next) => {
    GlobalLogger(req);
    return res.sendStatus(500);
})

module.exports = app;