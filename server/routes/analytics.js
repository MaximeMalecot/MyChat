const { Router } = require("express");
const { SpecificLogger } = require("../lib/logger");
const { AnalyticsController } = require('../controller');
const { verifyToken } = require('../lib/jwt');

const router = new Router();

router.get("/connections", AnalyticsController.getLiveConnections);

router.route('/')
    .get(AnalyticsController.getAnalytics)
    .post(AnalyticsController.postAnalytic)

module.exports = router;