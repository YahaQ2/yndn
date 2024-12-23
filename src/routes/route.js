import express from 'express'
import { commentsController } from '../controllers/comments.controller.js'

const router = express.Router()

router.get('/comments', commentsController.getComments)
router.post('/comments', commentsController.createComment)
router.delete('/comments/:id', commentsController.deleteComment)

export default router

