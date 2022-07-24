const { Router } = require("express");
const { SpecificLogger } = require("../lib/logger");
const { AnalyticsController } = require('../controller');
const { verifyToken } = require('../lib/jwt');

const router = new Router();
router.route('/')
    .get(verifyToken, AnalyticsController.getAnalytics)
    .post(verifyToken, AnalyticsController.postAnalytic)

router.get("/connections", AnalyticsController.getLiveConnections);

module.exports = router;