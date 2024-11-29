const SpotifyService = require('../services/spotify-service');
const supabase = require('../database');

class MenfessController {
  /**
   * @swagger
   * /v1/api/menfess-spotify:
   *   post:
   *     summary: Membuat menfess baru dengan Spotify
   *     tags: [Menfess]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               sender:
   *                 type: string
   *                 description: Pengirim menfess
   *               message:
   *                 type: string
   *                 description: Isi pesan menfess
   *               spotify_id:
   *                 type: string
   *                 description: Judul lagu untuk dicari di Spotify
   *               recipient:
   *                 type: string
   *                 description: Penerima menfess
   *             required:
   *               - sender
   *               - message
   *               - recipient
   *     responses:
   *       201:
   *         description: Menfess berhasil dibuat
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                 message:
   *                   type: string
   *                 data:
   *                   type: object
   *                   properties:
   *                     id:
   *                       type: integer
   *                     sender:
   *                       type: string
   *                     message:
   *                       type: string
   *                     song:
   *                       type: string
   *                     recipient:
   *                       type: string
   *       400:
   *         description: Data input tidak lengkap atau lagu tidak ditemukan
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                 message:
   *                   type: string
   *       500:
   *         description: Terjadi kesalahan pada server
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                 message:
   *                   type: string
   */
  static async createMenfessWithSpotify(req, res) {
    try {
      const { sender, message, spotify_id, recipient } = req.body;

      if (!sender || !message || !recipient) {
        return res.status(400).json({
          success: false,
          message: 'Sender, message, recipient is required',
        });
      }

      let spotifyId = null;

      if (spotify_id) {
        try {
          const track = await SpotifyService.searchSong(spotify_id);

          if (!track) {
            return res.status(400).json({
              success: false,
              message: 'Song not found on Spotify',
            });
          }

          spotifyId = track.id;
        } catch (error) {
          console.error('Error fetching song from Spotify:', error.message);
          return res.status(500).json({
            success: false,
            message: 'Failed to fetch song from Spotify',
          });
        }
      }

      const { data: newMenfess, error } = await supabase.from('menfess').insert([
        {
          sender,
          message,
          spotify_id: spotifyId || '',
          recipient,
        },
      ]);

      if (error) {
        console.error(error);
        return res.status(500).json({
          success: false,
          message: 'Internal Server Error',
        });
      }

      return res.status(201).json({
        success: true,
        message: 'Success create menfess',
        data: newMenfess,
      });
    } catch (error) {
      console.error('Error creating menfess:', error.message);
      return res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      });
    }
  }
}

module.exports = MenfessController;
