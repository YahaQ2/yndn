const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')
const MenfessController  = require('../controllers/commentController')

// Routes Menfess
router.get('/comments', commentController.getComments)
router.post('/comments', Controller.createComments
)
// router.put('/menfess/:id', MenfessController.editMenfess)
router.get('/comments/:id', Controller.getCommentsById)
// router.delete('/menfess/:id', MenfessController.deleteMenfess)



module.exports = router





