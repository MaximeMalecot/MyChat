const { Router } = require("express");
const { FriendshipController } = require('../controller');
const { verifyToken } = require('../middlewares/auth');

const router = new Router();

router.route('/invitations/:id')
    .post(verifyToken, FriendshipController.sendInvitation)
	.patch(verifyToken, FriendshipController.acceptInvitation)
	.delete(verifyToken, FriendshipController.denyInvitation);

    
router.route('/invitations')
    .get(verifyToken, FriendshipController.getInvitations)

router.route('/status/:userId')
    .get(verifyToken, FriendshipController.getFriendshipStatus);

router.route('/:userId')
    .get(FriendshipController.getList)
    .delete(verifyToken, FriendshipController.removeFriend)

router.get('/', verifyToken, FriendshipController.getFriendListRecommendation);
    
module.exports = router;
