const pool = require("../models/db");

// Get comments by messageId
const getCommentsByMessageId = async (req, res) => {
  const { messageId } = req.query;

  try {
    const result = await pool.query(
      "SELECT * FROM comments WHERE message_id = $1 ORDER BY created_at ASC",
      [messageId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};

// Add a new comment
const addComment = async (req, res) => {
  const { messageId, content } = req.body;

  if (!messageId || !content) {
    return res.status(400).json({ error: "messageId and content are required" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO comments (message_id, content) VALUES ($1, $2) RETURNING *",
      [messageId, content]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add comment" });
  }
};

module.exports = { getCommentsByMessageId, addComment };