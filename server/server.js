require('dotenv').config();
const cors = require("cors");
const express = require("express");
const mainRouter = require( "./routes" );
const { GlobalLogger } = require("./lib/logger");

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

app.use("/", mainRouter);

app.use((req, res, next) => {
    console.log(req);
    /*GlobalLogger(req);
    return res.sendStatus(500);*/
})

module.exports = app;