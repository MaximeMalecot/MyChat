const { Router } = require("express");
const { FriendshipController } = require('../controller');

const router = new Router();
router.route('/')
    .get(FriendshipController.getList)

router.route('/invitations')
    //.get(FriendshipController.getInvitations)

router.route('/invitations/:id')
    //.post()
	//.patch(FriendshipController.acceptInvitation)
	//.delete(FriendshipController.denyInvitation);

module.exports = router;
