const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')
const MenfessController  = require('../controllers/spotify-controller')

// Routes Menfess
router.get('/menfess', Controller.getMenfess)
// router.post('/menfess', Controller.createMenfess)
// router.put('/menfess/:id', MenfessController.editMenfess)
router.get('/menfess/:id', Controller.getMenfessById)
// router.delete('/menfess/:id', MenfessController.deleteMenfess)

// Route Menfess v2
// router.post('/menfess-spotify', MenfessController.createMenfessWithSpotify)
router.get('/menfess-spotify-search', MenfessController.getMenfessSpotify)
router.get('/menfess-spotify-search/:id', MenfessController.getMenfessSpotifyById)
router.get('/search-spotify-song', MenfessController.searchSpotifySong)

module.exports = router