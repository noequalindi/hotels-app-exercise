const { Router } = require('express')
const router = Router();
const hotelsController = require('../controllers/HotelsController');

router.get('/', hotelsController.index)

module.exports = router;