const { Router } = require("express");
const { ReportController } = require('../controller');
const {verifyToken, checkAdmin} = require('../middlewares/auth');
const router = new Router();

router.get('/', verifyToken, checkAdmin, ReportController.getAll)
router.get('/:userId', verifyToken, checkAdmin, ReportController.getForUser)
router.put('/:id', verifyToken, checkAdmin, ReportController.modify)

module.exports = router;