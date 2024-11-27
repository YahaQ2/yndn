const express = require('express')
const router = express.Router()
const MenfessController = require('../controllers/controller')

// Routes Menfess
router.get('/menfess', MenfessController.index)
router.post('/menfess', MenfessController.store)
router.put('/menfess/:id', MenfessController.edit)
router.delete('/menfess/:id', MenfessController.delete)

module.exports = router