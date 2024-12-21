const express = require('express');
const router = express.Router();
const messageController = require('../controllers/controller');
const commentController = require('../controllers/commentController');

/**
 * @swagger
 * /api/messages/{id}:
 *   get:
 *     summary: Get a message by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Message not found
 *       500:
 *         description: Server error
 */
router.get('/messages/:id', messageController.getMessage);

/**
 * @swagger
 * /api/comments:
 *   get:
 *     summary: Get comments for a message
 *     parameters:
 *       - in: query
 *         name: messageId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Server error
 */
router.get('/comments', commentController.getComments);

/**
 * @swagger
 * /api/comments:
 *   post:
 *     summary: Add a new comment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               messageId:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comment created successfully
 *       500:
 *         description: Server error
 */
router.post('/comments', commentController.addComment);

module.exports = router;