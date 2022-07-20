const router = require( "express" ).Router();

router.use('/analytics', require('./analytics'));
router.use('/field', require('./field'));
router.use('/logs', require('./log'));
router.use('/security', require('./security'));
router.use('/techno', require('./techno'));
router.use('/users', require('./user'));
router.use('/friendship', require('./friendship'));

module.exports = router;