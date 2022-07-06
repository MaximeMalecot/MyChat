const router = require( "express" ).Router();

router.use('/analytics', require('./analytics'));
router.use('/logs', require('./log'));
router.use('/users', require('./user'));
router.use('/security', require('./security'));

module.exports = router;