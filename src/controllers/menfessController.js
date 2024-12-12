const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getMenfesses = async (req, res) => {
  try {
    const { sender, recipient, date } = req.query;
    let where = {};

    if (sender) where.sender = { contains: sender.toLowerCase() };
    if (recipient) where.recipient = { contains: recipient.toLowerCase() };
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1);
      where.createdAt = { gte: startDate, lt: endDate };
    }

    const menfesses = await prisma.menfess.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });

    res.json({ success: true, data: menfesses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.createMenfess = async (req, res) => {
  try {
    const { sender, message, song, recipient, spotify_id } = req.body;

    if (!sender || !message || !recipient) {
      return res.status(400).json({ success: false, message: "Sender, message, and recipient are required" });
    }

    const newMenfess = await prisma.menfess.create({
      data: { sender, message, song, recipient, spotify_id }
    });

    res.status(201).json({ success: true, data: newMenfess });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.getMenfessById = async (req, res) => {
  try {
    const { id } = req.params;
    const menfess = await prisma.menfess.findUnique({
      where: { id: Number(id) }
    });

    if (!menfess) {
      return res.status(404).json({ success: false, message: "Menfess not found" });
    }

    res.json({ success: true, data: menfess });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.updateMenfess = async (req, res) => {
  try {
    const { id } = req.params;
    const { sender, message, song, recipient, spotify_id } = req.body;

    const updatedMenfess = await prisma.menfess.update({
      where: { id: Number(id) },
      data: { sender, message, song, recipient, spotify_id }
    });

    res.json({ success: true, data: updatedMenfess });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.deleteMenfess = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.menfess.delete({
      where: { id: Number(id) }
    });

    res.json({ success: true, message: "Menfess deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
