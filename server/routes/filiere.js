const { Router } = require("express");
const { FiliereController } = require('../controller');

const router = new Router();
router.route('/')
    .post(FiliereController.postFiliere)
    .get(FiliereController.getFilieres)

module.exports = router;