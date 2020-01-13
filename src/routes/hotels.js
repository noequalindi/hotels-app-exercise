const { Router } = require('express')
const router = Router();
hotelsController = require('../controllers/HotelsController');

router.get('/', hotelsController.index)

module.exports = router;