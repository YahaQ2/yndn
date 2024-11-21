const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const { response } = require('../services/response')

class Controller {
    static async index(req, res) {
        try {
            const menfesses = await prisma.menfess.findMany()
            return res.status(200).json(response(true, true, null, menfesses))
        } catch (error) {
            console.error(error)
            return res.status(500).json(response(false, false, "Internal Server Error", null))
        }
    }

    static async store(req, res) {
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

    static async edit(req, res) {
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

            return res.status(201).json(response(true, true, "Success update menfess", updateMenfess))
        } catch (error) {
            console.error(error)
            return res.status(500).json(response(false, false, "Internal Server Error", null))
        }
    }

    static async delete(req, res) {
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

module.exports = Controller