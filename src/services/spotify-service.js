const axios = require('axios');
const rateLimit = require('axios-rate-limit');

// Konfigurasi rate limiter global
const http = rateLimit(axios.create(), { 
  maxRequests: 3, 
  perMilliseconds: 1000 
});

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
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
      }
      throw new Error('Failed to authenticate with Spotify');
    }
  }

  static async searchSong(query, retries = 3) {
    try {
      const accessToken = await this.getAccessToken();

      const response = await http.get('https://api.spotify.com/v1/search', {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: {
          q: query,
          type: 'track',
          limit: 5,
        },
      });

      const tracks = response.data.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists.map((artist) => artist.name).join(', '),
        album: track.album.name,
        cover_url: track.album.images[0]?.url || '',
      }));

      return tracks;
    } catch (error) {
      console.error('Error searching song in Spotify:', error.message);

      // Handling specific error scenarios
      if (error.response && error.response.status === 429 && retries > 0) {
        const waitTime = Math.pow(2, 3 - retries) * 1000;
        console.log(`Rate limit hit. Waiting ${waitTime/1000} seconds before retry.`);
        
        await new Promise(resolve => setTimeout(resolve, waitTime));
        return this.searchSong(query, retries - 1);
      }

      throw new Error('Failed to fetch song from Spotify.');
    }
  }
}

class SpotifyTrackService {
  static async getTrackDetails(menfessSpotifyId, retries = 3) {
    try {
      const accessToken = await SpotifyService.getAccessToken();

      const response = await http.get(`https://api.spotify.com/v1/tracks/${menfessSpotifyId}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });

      const track = response.data;
      return {
        id: track.id,
        name: track.name,
        artist: track.artists.map(artist => artist.name).join(', '),
        album: track.album.name,
        cover_url: track.album.images[0]?.url || '',
        preview_url: track.preview_url || null,
        external_url: track.external_urls.spotify || null
      };
    } catch (error) {
      console.error('Error fetching track details:', error.message);

      // Handling specific error scenarios
      if (error.response && error.response.status === 429 && retries > 0) {
        const waitTime = Math.pow(2, 3 - retries) * 1000;
        console.log(`Rate limit hit. Waiting ${waitTime/1000} seconds before retry.`);
        
        await new Promise(resolve => setTimeout(resolve, waitTime));
        return this.getTrackDetails(menfessSpotifyId, retries - 1);
      }

      throw new Error('Failed to fetch track details from Spotify');
    }
  }
}

module.exports = {
  SpotifyService,
  SpotifyTrackService
};