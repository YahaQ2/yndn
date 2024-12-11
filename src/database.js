const { createClient } = require('@supabase/supabase-js');
const subdata = process.env.SUB_DATA;
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey, subdata);

const checkConnection = async () => {
    try {
        const { data, error } = await supabase
            .from('menfess')
            .select('id')
            .limit(1);

        if (error) {
            console.error('Koneksi gagal:', error);
            return;
        }

        console.log('Koneksi ke Supabase berhasil! Data sample:', data);
    } catch (error) {
        console.error('Terjadi kesalahan saat memeriksa koneksi:', error);
    }
};

checkConnection();

module.exports = supabase;
