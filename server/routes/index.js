const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

// serve up react front-end in production
router.use((req, res) => {
  res.sendFile(join(__dirname, '../../client/build/index.html'));
});

module.exports = router;
