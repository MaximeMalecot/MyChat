const { Router } = require("express");
const { UserController } = require('../controller');
const { verifyToken } = require('../middlewares/auth');

const router = new Router();
router.route('/')
    .get(verifyToken, UserController.getUsers)
	.post(UserController.postUser)

router.route('/self')
	.get(verifyToken, UserController.getSelf)
	.put(verifyToken, UserController.modifySelf)
router.put('/self/techno', verifyToken, UserController.modifySelfTechno)

router.route('/:id')
	.get(verifyToken, UserController.getUser)
	.put(UserController.modifyUser)
	.delete(UserController.deleteUser);

module.exports = router;
