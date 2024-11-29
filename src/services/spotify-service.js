const axios = require('axios');

class SpotifyService {

  static async getAccessToken() {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    const token = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    try {
      const response = await axios.post(
        'https://accounts.spotify.com/api/token',
        'grant_type=client_credentials',
        {
          headers: {
            Authorization: `Basic ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      return response.data.access_token;
    } catch (error) {
      console.error('Error getting Spotify access token:', error.message);
      throw new Error('Failed to authenticate with Spotify');
    }
  }


  static async searchSong(query) {
    try {
      const clientId = process.env.SPOTIFY_CLIENT_ID;
      const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  
      if (!clientId || !clientSecret) {
        throw new Error('Spotify credentials are missing');
      }
  
      const accessToken = await this.getAccessToken();
  
      const response = await axios.get('https://api.spotify.com/v1/search', {
        headers: { 
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        params: {
          q: query,
          type: 'track',
          limit: 1,
        },
      });
  
      const tracks = response.data.tracks?.items;
  
      if (!tracks || tracks.length === 0) {
        return null;
      }
  
      const track = tracks[0];
      return {
        id: track.id,
        name: track.name,
        artist: track.artists.map((artist) => artist.name).join(', '),
        album: track.album.name,
        preview_url: track.preview_url,
      };
    } catch (error) {
      console.error('Detailed Spotify search error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        stack: error.stack
      });
      throw error;
    }
  }
}

module.exports = SpotifyService;
