const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// URL dan Kunci Supabase dari .env
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

// Inisialisasi Supabase Client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Fungsi untuk memeriksa koneksi ke Supabase
 */
const checkConnection = async () => {
  try {
    const { data, error } = await supabase.from('messages').select('id').limit(1);

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