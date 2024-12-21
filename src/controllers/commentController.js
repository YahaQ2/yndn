const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getComments = async (req, res) => {
  const { messageId } = req.query;

  try {
    const comments = await prisma.comment.findMany({
      where: { messageId: parseInt(messageId) },
      orderBy: { created_at: 'asc' },
    });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addComment = async (req, res) => {
  const { messageId, content } = req.body;

  try {
    const comment = await prisma.comment.create({
      data: { messageId: parseInt(messageId), content },
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};