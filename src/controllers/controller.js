const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const { response } = require('../services/response')

class Controller {
    /**
     * @swagger
     * /v1/api/menfess:
     *   get:
     *     summary: Mendapatkan daftar menfess dengan filter berdasarkan query parameters
     *     tags: [Menfess]
     *     parameters:
     *       - in: query
     *         name: sender
     *         schema:
     *           type: string
     *         description: Nama pengirim yang ingin dicari
     *       - in: query
     *         name: recipient
     *         schema:
     *           type: string
     *         description: Nama penerima yang ingin dicari
     *     responses:
     *       200:
     *         description: Daftar menfess berhasil diambil
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Menfess'
     *       500:
     *         description: Terjadi kesalahan pada server
     */
    static async getMenfess(req, res) {
        try {
            const { sender, recipient } = req.query;

            const filters = {};
            if (sender) {
                filters.sender = {
                    contains: sender.toLowerCase(),
                };
            }
            if (recipient) {
                filters.recipient = {
                    contains: recipient.toLowerCase(),
                };
            }
    
            const menfesses = await prisma.menfess.findMany({
                where: filters,
            });
    
            if (menfesses.length === 0) {
                return res.status(404).json(response(false, false, "Menfess tidak ditemukan", null));
            }
    
            return res.status(200).json(response(true, true, null, menfesses));
        } catch (error) {
            console.error(error);

            if (error instanceof PrismaClientValidationError) {
                return res.status(400).json(response(false, false, "Error dalam validasi Prisma", null));
            }
            
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
            const { sender, message, song, recipient } = req.body

            if (!sender || !message || !recipient) {
                return res.status(400).json(response(false, false, "Sender, message, recipient is required", null))
            }

            const newMenfess = await prisma.menfess.create({
                data: {
                    sender, 
                    message, 
                    song: song || '', 
                    recipient
                }
            })

            return res.status(201).json(response(true, true, "Success create menfess", newMenfess))
        } catch (error) {
            console.error(error)
            return res.status(500).json(response(false, false, "Internal Server Error", null))
        }
    }


    /**
     * @swagger
     * /v1/api/menfess/{id}:
     *   get:
     *     summary: Menemukan menfess berdasarkan ID
     *     tags: [Menfess]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: ID menfess yang akan diperbarui
     *     responses:
     *       200:
     *         description: Menfess berhasil diperbarui
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Menfess'
     *       404:
     *         description: Menfess tidak ditemukan
     *       500:
     *         description: Terjadi kesalahan pada server
     */
    static async getMenfessById(req, res) {
        try {
            const id = req.params.id

            const menfessById = await prisma.menfess.findUnique({
                where: { id: parseInt(id) },
            })

            return res.status(200).json(response(true, true, "Success update menfess", menfessById))
        } catch (error) {
            console.error(error)
            return res.status(500).json(response(false, false, "Internal Server Error", null))
        }
    }

    /**
     * @swagger
     * /v1/api/menfess/{id}:
     *   put:
     *     summary: Memperbarui menfess berdasarkan ID
     *     tags: [Menfess]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: ID menfess yang akan diperbarui
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Menfess'
     *     responses:
     *       200:
     *         description: Menfess berhasil diperbarui
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Menfess'
     *       404:
     *         description: Menfess tidak ditemukan
     *       500:
     *         description: Terjadi kesalahan pada server
     */
    static async editMenfess(req, res) {
        try {
            const id = req.params.id
            const { sender, message, song, recipient } = req.body

            const updateMenfess = await prisma.menfess.update({
                where: { id: parseInt(id) }, 
                data: {
                    sender, 
                    message, 
                    song, 
                    recipient, 
                    updatedAt: new Date()
                }
            })

            return res.status(200).json(response(true, true, "Success update menfess", updateMenfess))
        } catch (error) {
            console.error(error)
            return res.status(500).json(response(false, false, "Internal Server Error", null))
        }
    }

    /**
     * @swagger
     * /v1/api/menfess/{id}:
     *   delete:
     *     summary: Menghapus menfess berdasarkan ID
     *     tags: [Menfess]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: ID menfess yang akan dihapus
     *     responses:
     *       200:
     *         description: Menfess berhasil dihapus
     *       404:
     *         description: Menfess tidak ditemukan
     *       500:
     *         description: Terjadi kesalahan pada server
     */
    static async deleteMenfess(req, res) {
        try {
            const id = req.params.id

            await prisma.menfess.delete({
                where: { id: parseInt(id) }
            })

            return res.status(200).json(response(true, true, "Success delete menfess", null))
        } catch (error) {
            console.error(error)
            return res.status(500).json(response(false, false, "Internal Server Error", null))
        }
    }
}

module.exports = Controller;
