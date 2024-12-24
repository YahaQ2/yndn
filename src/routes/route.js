onst express = require('express');
const { commentsController } = require('../controllers/commentController');

const router = express.Router();

router.get('/comments', commentsController.getComments);
router.post('/comments', commentsController.createComment);
router.delete('/comments/:id', commentsController.deleteComment);

module.exports = router;
