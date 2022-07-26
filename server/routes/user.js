const { Router } = require("express");
const { UserController } = require('../controller');
const { verifyToken, checkAdmin } = require('../middlewares/auth');

const router = new Router();
router.route('/')
    .get(verifyToken, checkAdmin, UserController.getUsers)

router.get('/search', verifyToken, UserController.searchUsers)

router.route('/self')
	.get(verifyToken, UserController.getSelf)
	.put(verifyToken, UserController.modifySelf)
	.delete(verifyToken, UserController.deleteSelf)
	
router.put('/self/techno', verifyToken, UserController.modifySelfTechno)

router.put('/self/field', verifyToken, UserController.modifySelfField)

router.route('/:id')
	.get(verifyToken, UserController.getUser)
	.put(verifyToken, checkAdmin, UserController.modifyUser)
	.post(verifyToken, UserController.reportUser)
	.delete(verifyToken, checkAdmin, UserController.deleteUser);

module.exports = router;
