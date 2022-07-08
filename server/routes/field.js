const { Router } = require("express");
const { FieldController } = require('../controller');

const router = new Router();
router.route('/')
    .post(FieldController.postField)
    .get(FieldController.getFields)

module.exports = router;