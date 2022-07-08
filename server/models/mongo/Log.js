const mongoose = require("./db");

const LogSchema = new mongoose.Schema({
  type: { type: String, default: 'SERVER'},
  message: { type: String, required: true},
  date: { type: Date, default: Date.now()},
  level: { type: Number, default: 2},
  route: { type: String, required: true}
});

const Log = mongoose.model("logs", LogSchema);

module.exports = Log;
