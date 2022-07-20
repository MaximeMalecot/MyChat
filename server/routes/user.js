const { Router } = require("express");
const { UserController } = require('../controller');
const { verifyToken } = require('../middlewares/auth');

const router = new Router();
router.route('/')
    .get(UserController.getUsers)
	.post(UserController.postUser)

router.route('/:id')
	.get(verifyToken, UserController.getUser)
	.put(UserController.modifyUser)
	.delete(UserController.deleteUser);

module.exports = router;
