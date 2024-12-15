const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')
const MenfessController  = require('../controllers/spotify-controller')

// Routes Menfess
router.get('/menfess', Controller.getMenfess)
router.post('/menfess', Controller.createMenfess)
router.get('/menfess/:id', Controller.getMenfessById)

// Route Menfess v2
router.post('/menfess-spotify', MenfessController.createMenfessWithSpotify)
router.get('/menfess-spotify', MenfessController.getMenfessSpotify)
router.get('/menfess-spotify/:id', MenfessController.getMenfessSpotifyById)
router.get('/search-spotify-song', MenfessController.searchSpotifySong)

module.exports = router

