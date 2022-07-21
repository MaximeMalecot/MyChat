const { Router } = require("express");
const { FriendshipController } = require('../controller');
const { verifyToken } = require('../middlewares/auth');

const router = new Router();

router.route('/invitations/:id')
    .post(verifyToken, FriendshipController.sendInvitation)
	.patch(verifyToken, FriendshipController.acceptInvitation)
	//.delete(FriendshipController.denyInvitation);

    
router.route('/invitations')
    .get(verifyToken, FriendshipController.getInvitations)

router.route('/:id')
    //.get(FriendshipController.getList)
module.exports = router;
