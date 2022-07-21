const { Router } = require("express");
const { TechnoController } = require('../controller');
const {verifyToken, checkAdmin} = require('../middlewares/auth');
const router = new Router();

router.route('/')
    .post(verifyToken, checkAdmin, TechnoController.postTechno)
    .get(TechnoController.getTechnos)

router.route('/:id')
    .put(verifyToken, checkAdmin, TechnoController.putTechno)
    .delete(verifyToken, checkAdmin, TechnoController.deleteTechno)

module.exports = router;