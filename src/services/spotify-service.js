const axios = require('axios');

class SpotifyService {
  static async getAccessToken() {
    try {
      const response = await axios.post('https://accounts.spotify.com/api/token', 
        new URLSearchParams({
          'grant_type': 'client_credentials',
          'client_id': process.env.SPOTIFY_CLIENT_ID,
          'client_secret': process.env.SPOTIFY_CLIENT_SECRET
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );
      return response.data.access_token;
    } catch (error) {
      console.error('Gagal mendapatkan access token:', error.message);
      throw new Error('Gagal mendapatkan access token Spotify');
    }
  }

  static async searchSong(query) {
    try {
      const accessToken = await this.getAccessToken();

      const response = await axios.get('https://api.spotify.com/v1/search', {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: {
          q: query,
          type: 'track',
          limit: 5,
        },
      });

      return response.data.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists.map(artist => artist.name).join(', '),
        album: track.album.name,
        cover_url: track.album.images[0]?.url || '',
      }));
    } catch (error) {
      console.error('Error mencari lagu di Spotify:', error.message);
      throw new Error('Gagal mengambil lagu dari Spotify.');
    }
  }

  static async getTrackDetails(menfessSpotifyId) {
    try {
      const accessToken = await this.getAccessToken();

      const response = await axios.get(`https://api.spotify.com/v1/tracks/${menfessSpotifyId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const track = response.data;
      return {
        id: track.id,
        name: track.name,
        artist: track.artists.map(artist => artist.name).join(', '),
        album: track.album.name,
        cover_url: track.album.images[0]?.url || '',
        preview_url: track.preview_url || null,
        external_url: track.external_urls.spotify || null,
      };
    } catch (error) {
      console.error('Error mengambil detail track:', error.message);
      return null;
    }
  }
}

module.exports = SpotifyService;