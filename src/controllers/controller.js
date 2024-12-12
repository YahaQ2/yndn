const supabase = require('../database');
const { response } = require('../services/response');
const Joi = require('joi');

// Schema untuk validasi menfess
const menfessSchema = Joi.object({
    sender: Joi.string().required(),
    message: Joi.string().required(),
    song: Joi.string().optional(),
    recipient: Joi.string().required(),
});

class Controller {
    /**
     * @swagger
     * /v1/api/menfess:
     *   get:
     *     summary: Retrieve menfess messages
     *     tags:
     *       - Menfess
     *     parameters:
     *       - in: query
     *         name: sender
     *         schema:
     *           type: string
     *         description: Filter by sender name
     *       - in: query
     *         name: recipient
     *         schema:
     *           type: string
     *         description: Filter by recipient name
     *       - in: query
     *         name: date
     *         schema:
     *           type: string
     *           format: date
     *         description: >
     *           Filter by date (format: YYYY-MM-DD)
     *     responses:
     *       200:
     *         description: Successful retrieval of menfess messages
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Menfess'
     *       404:
     *         description: No menfess messages found
     *       500:
     *         description: Internal server error
     */
    static async getMenfess(req, res) {
        try {
            const { sender, recipient, date } = req.query;
            let query = supabase.from('menfess').select('*');

            if (sender) {
                query = query.ilike('sender', `%${sender.toLowerCase()}%`);
            }
            if (recipient) {
                query = query.ilike('recipient', `%${recipient.toLowerCase()}%`);
            }

            if (date) {
                const formattedDate = date + ' 00:00:00';
                query = query.gte('created_at', formattedDate).lte(`${date} 23:59:59`);
            }

            query = query.order('created_at', { ascending: false });

            const { data: menfesses, error } = await query;

            if (error) {
                console.error(error);
                return res.status(500).json(response(false, false, "Internal Server Error", null));
            }

            if (!menfesses || menfesses.length === 0) {
                return res.status(404).json(response(false, false, "Menfess tidak ditemukan", null));
            }

            return res.status(200).json(response(true, true, null, menfesses));
        } catch (error) {
            console.error(error);
            return res.status(500).json(response(false, false, "Internal Server Error", null));
        }
    }

    /**
     * @swagger
     * /v1/api/menfess:
     *   post:
     *     summary: Membuat menfess baru
     *     tags: [Menfess]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Menfess'
     *     responses:
     *       201:
     *         description: Menfess berhasil dibuat
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Menfess'
     *       400:
     *         description: Data input tidak lengkap
     *       500:
     *         description: Terjadi kesalahan pada server
     */
    static async createMenfess(req, res) {
        try {
            const { error } = menfessSchema.validate(req.body);
            if (error) {
                return res.status(400).json(response(false, false, error.details[0].message, null));
            }

            const { sender, message, song, recipient } = req.body;

            const { data: newMenfess, error: insertError } = await supabase
                .from('menfess')
                .insert([{ sender, message,