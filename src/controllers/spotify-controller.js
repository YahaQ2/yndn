const { SpotifyService, SpotifyTrackService } = require('../services/spotify-service');
const supabase = require('../database');
const { response } = require('../services/response');

class MenfessController {
  static async createMenfessWithSpotify(req, res) {
    try {
      const { sender, message, spotify_id, recipient } = req.body;

      if (!sender || !message || !recipient || !spotify_id) {
        return res.status(400).json(response(false, false, "All fields are required", null));
      }

      const { data: newMenfess, error } = await supabase.from('menfess').insert([
        { sender, message, spotify_id, recipient }
      ]);

      if (error) {
        console.error(error);
        return res.status(500).json(response(false, false, "Internal Server Error", null));
      }

      return res.status(201).json(response(true, true, "Menfess created successfully", newMenfess));
    } catch (error) {
      console.error('Error creating menfess:', error.message);
      return res.status(500).json(response(false, false, "Internal Server Error", null));
    }
  }

  static async searchSpotifySong(req, res) {
    try {
      const { song } = req.query;

      if (!song) {
        return res.status(400).json(response(false, false, "Song query is required", null));
      }

      const track = await SpotifyService.searchSong(song);

      if (!track) {
        return res.status(404).json(response(false, false, "Song not found", null));
      }

      return res.status(200).json(response(true, true, null, track));
    } catch (error) {
      console.error('Error searching song:', error.message);
      return res.status(500).json(response(false, false, "Failed to search song", null));
    }
  }

  static async getMenfessSpotify(req, res) {
    try {
      const { id, sender, recipient, date, sort } = req.query;

      let query = supabase.from('menfess').select('*');
      if (id) query = query.eq('id', id);
      if (sender) query = query.ilike('sender', `%${sender.toLowerCase()}%`);
      if (recipient) query = query.ilike('recipient', `%${recipient.toLowerCase()}%`);
      if (date) {
        query = query.gte('created_at', `${date} 00:00:00`).lte('created_at', `${date} 23:59:59`);
      }
      query = query.order('created_at', { ascending: sort === 'asc' });

      const { data: menfesses, error } = await query;

      if (error || !menfesses.length) {
        return res.status(404).json(response(false, false, "No menfess found", null));
      }

      const menfessWithTracks = await Promise.all(menfesses.map(async (menfess) => {
        let trackDetails = null;
        if (menfess.spotify_id) {
          try {
            trackDetails = await SpotifyTrackService.getTrackDetails(menfess.spotify_id);
          } catch (err) {
            console.error('Error fetching Spotify track:', err.message);
          }
        }
        return {
          ...menfess,
          track: trackDetails || { title: "Unknown", artist: "Unknown" }
        };
      }));

      return res.status(200).json(response(true, true, null, menfessWithTracks));
    } catch (error) {
      console.error(error);
      return res.status(500).json(response(false, false, "Internal Server Error", null));
    }
  }
}

module.exports = MenfessController;