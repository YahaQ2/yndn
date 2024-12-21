const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getMessage = async (req, res) => {
  const { id } = req.params;

  try {
    const message = await prisma.message.findUnique({
      where: { id: parseInt(id) },
      include: { track: true },
    });

    if (!message) {
      return res.status(404).json({ status: false, message: 'Message not found' });
    }

    res.json({ status: true, data: [message] });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};