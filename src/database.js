const { createClient } = require('@supabase/supabase-js');

// URL dan Kunci Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

// Inisialisasi Supabase Client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Fungsi untuk memeriksa koneksi ke Supabase
 */
const checkConnection = async () => {
    try {
        // Tes mengambil data dari tabel 'menfess'
        const { data, error } = await supabase
            .from('menfess')
            .select('id')
            .limit(1);

        if (error) {
            console.error('❌ Koneksi gagal:', error.message);
        } else {
            console.log('✅ Koneksi ke Supabase berhasil! Data sample:', data);
        }
    } catch (err) {
        console.error('❌ Terjadi kesalahan saat memeriksa koneksi:', err.message);
    }
};

module.exports = {
    supabase,
    checkConnection,
};