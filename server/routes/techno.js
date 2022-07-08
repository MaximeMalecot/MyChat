const { Router } = require("express");
const { TechnoController } = require('../controller');

const router = new Router();
router.route('/')
    .post(async(req, res, next) => { next() }
    )
    .get(async(req, res, next) => { next() }
    )

module.exports = router;