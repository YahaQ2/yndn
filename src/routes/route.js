const express = require('express')
const router = express.Router()
const MenfessController = require('../controllers/controller')

// Routes Menfess
router.get('/', MenfessController.index)
router.post('/add', MenfessController.store)
router.put('/:id/update', MenfessController.edit)
router.delete('/:id/remove', MenfessController.delete)

module.exports = router