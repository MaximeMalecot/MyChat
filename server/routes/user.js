const { Router } = require("express");
const { UserController } = require('../controller');
const { verifyToken } = require('../middlewares/auth');

const router = new Router();
router.route('/')
    .get(verifyToken, UserController.getUsers)
	.post(UserController.postUser)

router.get('/self', verifyToken, UserController.getSelf)

router.route('/:id')
	.get(verifyToken, UserController.getUser)
	.put(UserController.modifyUser)
	.delete(UserController.deleteUser);

module.exports = router;
