const { supabase } = require('../database');

// Mendapatkan pesan berdasarkan `id`
exports.getMessage = async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*, track(*)')
      .eq('id', parseInt(id))
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ status: false, message: 'Message not found' });

    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};