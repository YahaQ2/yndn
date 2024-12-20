const express = require('express');
const { supabase } = require('../database');
const router = express.Router();

// Endpoint: Ambil semua komentar untuk pesan tertentu
router.get('/comments', async (req, res) => {
    const { messageId } = req.query;

    if (!messageId) {
        return res.status(400).json({ message: 'Parameter messageId wajib diisi' });
    }

    try {
        const { data, error } = await supabase
            .from('comments')
            .select('*')
            .eq('messageId', messageId);

        if (error) {
            return res.status(500).json({ message: 'Gagal mengambil komentar', error });
        }

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: 'Terjadi kesalahan', error: err.message });
    }
});

// Endpoint: Tambah komentar baru
router.post('/comments', async (req, res) => {
    const { messageId, content } = req.body;

    if (!messageId || !content) {
        return res.status(400).json({ message: 'Semua data wajib diisi' });
    }

    try {
        const { data, error } = await supabase
            .from('comments')
            .insert([{ messageId, content }]);

        if (error) {
            return res.status(500).json({ message: 'Gagal menambahkan komentar', error });
        }

        res.status(201).json(data[0]); // Mengembalikan komentar yang baru ditambahkan
    } catch (err) {
        res.status(500).json({ message: 'Terjadi kesalahan', error: err.message });
    }
});