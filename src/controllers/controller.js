const supabase = require('../database');
const { response } = require('../services/response');

class Controller {
    static async getMenfess(req, res) {
        try {
            const { sender, recipient, date } = req.query;
            let query = supabase.from('menfess').select('*');

            if (sender) {
                query = query.ilike('sender', `%${sender.toLowerCase()}%`);
            }
            if (recipient) {
                query = query.ilike('recipient', `%${recipient.toLowerCase()}%`);
            }

            if (date) {
                const formattedDate = date + ' 00:00:00';
                query = query.gte('created_at', formattedDate).lte('created_at', `${date} 23:59:59`);
            }    

            query = query.order('created_at', { ascending: false });

            const { data: menfesses, error } = await query;
    
            if (error) {
                console.error(error);
                return res.status(500).json(response(false, false, "Internal Server Error", null));
            }
    
            if (!menfesses || menfesses.length === 0) {
                return res.status(404).json(response(false, false, "Menfess tidak ditemukan", null));
            }
    
            return res.status(200).json(response(true, true, null, menfesses));
        } catch (error) {
            console.error(error);
            return res.status(500).json(response(false, false, "Internal Server Error", null));
        }
    }

    static async createMenfess(req, res) {
        try {
            const { sender, message, song, recipient } = req.body;

            if (!sender || !message || !recipient) {
                return res.status(400).json(response(false, false, "Sender, message, recipient is required", null));
            }

            const { data: newMenfess, error } = await supabase
                .from('menfess')
                .insert([
                    { sender, message, song: song || '', recipient }
                ]);

            if (error) {
                console.error(error);
                return res.status(500).json(response(false, false, "Internal Server Error", null));
            }

            return res.status(201).json(response(true, true, "Success create menfess", newMenfess));
        } catch (error) {
            console.error(error);
            return res.status(500).json(response(false, false, "Internal Server Error", null));
        }
    }

    static async getMenfessById(req, res) {
        try {
            const id = req.params.id;

            const { data: menfessById, error } = await supabase
                .from('menfess')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.error(error);
                return res.status(500).json(response(false, false, "Internal Server Error", null));
            }

            if (!menfessById) {
                return res.status(404).json(response(false, false, "Menfess tidak ditemukan", null));
            }

            return res.status(200).json(response(true, true, "Success get menfess", menfessById));
        } catch (error) {
            console.error(error);
            return res.status(500).json(response(false, false, "Internal Server Error", null));
        }
    }
}

module.exports = Controller;

