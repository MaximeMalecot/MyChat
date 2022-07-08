const mongoose = require('./db');

const AnalyticSchema = new mongoose.Schema({
    client: { type: String, required: true},
    action: { type: String, required: true},
    page: { type: String, required: true},
    date: { type: Date, default: Date.now()}
})

const Analytic = mongoose.model("analytics", AnalyticSchema);

module.exports = Analytic;