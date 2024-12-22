const { supabase } = require('../database');

// Mendapatkan komentar berdasarkan `messageId`
exports.getComments = async (req, res) => {
  const { messageId } = req.query;

  try {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('messageId', parseInt(messageId))
      .order('created_at', { ascending: true });

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Menambahkan komentar baru
exports.addComment = async (req, res) => {
  const { messageId, content } = req.body;

  try {
    const { data, error } = await supabase
      .from('comments')
      .insert([{ messageId: parseInt(messageId), content }]);

    if (error) throw error;

    res.status(201).json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};