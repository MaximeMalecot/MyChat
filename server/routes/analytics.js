const { Router } = require("express");
const { SpecificLogger } = require("../lib/logger");
const { analyticsController } = require('../controller');

const router = new Router();

router.get("/connect", analyticsController.connect);

router.get("/admin/connections", analyticsController.getLiveConnections);

router.post('/analytics', analyticsController.postAnalytic);

router.get('/analytics', analyticsController.getAnalytics)

module.exports = router;