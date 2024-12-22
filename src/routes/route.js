const express = require('express');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: API untuk mengelola komentar
 */

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Membuat komentar baru
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: Isi komentar
 *               userId:
 *                 type: string
 *                 description: ID pengguna
 *               messageId:
 *                 type: string
 *                 description: ID pesan
 *             required:
 *               - content
 *               - userId
 *               - messageId
 *     responses:
 *       201:
 *         description: Komentar berhasil dibuat
 *       500:
 *         description: Terjadi kesalahan
 */
router.post('/comments', (req, res) => {
  // Implementasi logika membuat komentar
  res.status(201).json({ message: 'Komentar berhasil dibuat' });
});

/**
 * @swagger
 * /comments/{messageId}:
 *   get:
 *     summary: Mendapatkan semua komentar untuk pesan tertentu
 *     tags: [Comments]
 *     parameters:
 *       - name: messageId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID pesan
 *     responses:
 *       200:
 *         description: Daftar komentar
 *       500:
 *         description: Terjadi kesalahan
 */
router.get('/comments/:messageId', (req, res) => {
  // Implementasi logika mendapatkan komentar
  res.status(200).json({ comments: [] });
});

module.exports = router;