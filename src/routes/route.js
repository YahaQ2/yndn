const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// Comment Routes
router.get('/comments', commentController.getComments);
router.post('/comments', commentController.createComment);
router.get('/comments/:id', commentController.getCommentById);
router.delete('/comments/:id', commentController.deleteComment);

module.exports = router;