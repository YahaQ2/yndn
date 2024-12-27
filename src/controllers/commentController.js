const { PrismaClient } = require('@prisma/client');
const { createClient } = require('@supabase/supabase-js');

const prisma = new PrismaClient();
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const commentController = {
  getComments: async (req, res) => {
    try {
      const { menfessId } = req.query;

      if (!menfessId) {
        return res.status(400).json({ error: 'Menfess ID is required' });
      }

      const comments = await prisma.comments.findMany({
        where: { messageId: menfessId },
        orderBy: { createdAt: 'desc' },
      });

      res.json(comments);
    } catch (error) {
      console.error('Error fetching comments:', error);
      res.status(500).json({ error: 'Failed to fetch comments' });
    }
  },

  createComment: async (req, res) => {
    try {
      const { content, menfessId, userName } = req.body;

      if (!content || !menfessId || !userName) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      const { data: user } = await supabase.auth.getUser();
      const userId = user?.id || null;

      const comment = await prisma.comments.create({
        data: {
          content,
          messageId: menfessId,
          userId,
        },
      });

      res.status(201).json(comment);
    } catch (error) {
      console.error('Error creating comment:', error);
      res.status(500).json({ error: 'Failed to create comment' });
    }
  },

  getCommentById: async (req, res) => {
    try {
      const { id } = req.params;
      const comment = await prisma.comments.findUnique({
        where: { id: parseInt(id, 10) },
      });

      if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
      }

      res.json(comment);
    } catch (error) {
      console.error('Error fetching comment:', error);
      res.status(500).json({ error: 'Failed to fetch comment' });
    }
  },

  deleteComment: async (req, res) => {
    try {
      const { id } = req.params;
      await prisma.comments.delete({ where: { id: parseInt(id, 10) } });
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting comment:', error);
      res.status(500).json({ error: 'Failed to delete comment' });
    }
  },
};

module.exports = commentController;