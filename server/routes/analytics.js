const { Router } = require("express");
const { SpecificLogger } = require("../lib/logger");
const { AnalyticsController } = require('../controller');

const router = new Router();
router.route('/')
    .get(AnalyticsController.getAnalytics)
    .post(AnalyticsController.postAnalytic)

router.get("/connect", AnalyticsController.connect);
router.get("/connections", AnalyticsController.getLiveConnections);

module.exports = router;