const express = require('express')
const router = express.Router()
const MenfessController = require('../controllers/controller')
const MenfessSpotifyController = require('../controllers/spotify-controller')

// Routes Menfess
router.get('/menfess', MenfessController.getMenfess)
router.post('/menfess', MenfessController.createMenfess)
// router.put('/menfess/:id', MenfessController.editMenfess)
router.get('/menfess/:id', MenfessController.getMenfessById)
// router.delete('/menfess/:id', MenfessController.deleteMenfess)

// Route Menfess v2
router.post('/menfess-spotify', MenfessSpotifyController.createMenfessWithSpotify)

module.exports = router