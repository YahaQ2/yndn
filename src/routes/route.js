const express = require('express')
const router = express.Router()
const MenfessController = require('../controllers/controller')

// Routes Menfess
router.get('/menfess', MenfessController.getMenfess)
router.post('/menfess', MenfessController.createMenfess)
// router.put('/menfess/:id', MenfessController.editMenfess)
router.get('/menfess/:id', MenfessController.getMenfessById)
// router.delete('/menfess/:id', MenfessController.deleteMenfess)

module.exports = router