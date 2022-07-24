const router = require( "express" ).Router();

router.use('/analytics', require('./analytics'));
router.use('/field', require('./field'));
router.use('/logs', require('./log'));
router.use('/security', require('./security'));
router.use('/techno', require('./techno'));
router.use('/user', require('./user'));
router.use('/friendship', require('./friendship'));
router.use('/notification', require('./notification'));
router.use('/message', require('./message'));
router.use('/report', require('./report'));
router.use('/sse', require('./sse'));

module.exports = router;