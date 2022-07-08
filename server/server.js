require('dotenv').config();
const cors = require("cors");
const express = require("express");
const mainRouter = require( "./routes" );
const { GlobalLogger, SpecificLogger, log } = require("./lib/logger");

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
    GlobalLogger(req);
    return res.sendStatus(500);
})

module.exports = app;