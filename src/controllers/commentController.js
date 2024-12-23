const supabase = require('../database');
const { response } = require('../services/response');

export const commentsController = {
  // Get all comments for a specific menfess
  getComments: async (req, res) => {
    try {
      const { menfessId } = req.query
      
      if (!menfessId) {
        return res.status(400).json({ error: 'Menfess ID is required' })
      }

      const comments = await prisma.comment.findMany({
        where: {
          menfessId: menfessId
        },
        orderBy: {
          createdAt: 'desc'
        }
      })

      res.json(comments)
    } catch (error) {
      console.error('Error fetching comments:', error)
      res.status(500).json({ error: 'Failed to fetch comments' })
    }
  },

  // Create a new comment
  createComment: async (req, res) => {
    try {
      const { content, menfessId, userName } = req.body

      if (!content || !menfessId || !userName) {
        return res.status(400).json({ 
          error: 'Content, menfessId, and userName are required' 
        })
      }

      // Get user ID from Supabase auth if available
      const { user } = await supabase.auth.getUser()
      const userId = user?.id

      const comment = await prisma.comment.create({
        data: {
          content,
          menfessId,
          userName,
          userId
        }
      })

      res.status(201).json(comment)
    } catch (error) {
      console.error('Error creating comment:', error)
      res.status(500).json({ error: 'Failed to create comment' })
    }
  },

  // Delete a comment (optional - for moderation)
  deleteComment: async (req, res) => {
    try {
      const { id } = req.params
      
      await prisma.comment.delete({
        where: { id }
      })

      res.status(204).send()
    } catch (error) {
      console.error('Error deleting comment:', error)
      res.status(500).json({ error: 'Failed to delete comment' })
    }
  }
}

module.exports = commentsController;