const express = require('express');
const router = express.Router();
const menfessController = require('../controllers/menfessController');

router.get('/menfess', menfessController.getMenfesses);
router.post('/menfess', menfessController.createMenfess);
router.get('/menfess/:id', menfessController.getMenfessById);
router.put('/menfess/:id', menfessController.updateMenfess);
router.delete('/menfess/:id', menfessController.deleteMenfess);

module.exports = router;