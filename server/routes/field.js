const { Router } = require("express");
const {verifyToken, checkAdmin} = require('../middlewares/auth');
const { FieldController } = require("../controller");

const router = new Router();
router
  .route("/")
  .post(verifyToken, checkAdmin, FieldController.postField)
  .get(FieldController.getFields)

router
  .route("/:id")
  .put(verifyToken, checkAdmin, FieldController.putField)
  .delete(verifyToken, checkAdmin, FieldController.deleteField);

module.exports = router;
