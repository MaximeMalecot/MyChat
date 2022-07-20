const { Router } = require("express");
const { FriendshipController } = require('../controller');
const { verifyToken } = require('../middlewares/auth');

const router = new Router();
router.route('/:id')
    .get(FriendshipController.getList)

router.route('/invitations')
    //.get(FriendshipController.getInvitations)

router.route('/invitations/:id')
    .post(verifyToken, FriendshipController.sendInvitation)
	//.patch(FriendshipController.acceptInvitation)
	//.delete(FriendshipController.denyInvitation);

module.exports = router;
