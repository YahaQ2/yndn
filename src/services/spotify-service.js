const axios = require('axios');

class SpotifyService {
  static accessToken = null;
  static tokenExpiryTime = null;
  static trackCache = new Map();

  static async getAccessToken() {
    if (this.accessToken && this.tokenExpiryTime > Date.now()) {
      return this.accessToken;
    }

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

      const expiresIn = response.data.expires_in * 1000; // API expiry time in ms
      this.accessToken = response.data.access_token;
      this.tokenExpiryTime = Date.now() + expiresIn - 60000; // Refresh 1 minute early

      return this.accessToken;
    } catch (error) {
      console.error('Error getting Spotify access token:', error.message);
      throw new Error('Failed to authenticate with Spotify');
    }
  }

  static async fetchWithRetry(url, options, retries = 3) {
    for (let attempt = 0; attempt < retries; attempt++) {
      try {
        return await axios.get(url, options);
      } catch (error) {
        if (error.response && error.response.status === 429 && attempt < retries - 1) {
          const retryAfter = error.response.headers['retry-after']
            ? parseInt(error.response.headers['retry-after'], 10) * 1000
            : 1000; // Default retry wait time is 1 second if not specified
          console.warn(`Rate limited. Retrying after ${retryAfter} ms...`);
          await new Promise(resolve => setTimeout(resolve, retryAfter));
        } else {
          throw error;
        }
      }
    }
  }

  static async searchSong(query) {
    try {
      const accessToken = await this.getAccessToken();

      const response = await this.fetchWithRetry(
        'https://api.spotify.com/v1/search',
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          params: {
            q: query,
            type: 'track',
            limit: 5,
          },
        }
      );

      return response.data.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists.map(artist => artist.name).join(', '),
        album: track.album.name,
        cover_url: track.album.images[0]?.url || '',
      }));
    } catch (error) {
      console.error('Error searching song in Spotify:', error.message);
      throw new Error('Failed to fetch song from Spotify.');
    }
  }

  static async getTrackDetails(menfessSpotifyId) {
    // Check if data exists in cache
    if (this.trackCache.has(menfessSpotifyId)) {
      return this.trackCache.get(menfessSpotifyId);
    }

    try {
      const accessToken = await this.getAccessToken();

      const response = await this.fetchWithRetry(
        `https://api.spotify.com/v1/tracks/${menfessSpotifyId}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      const track = response.data;
      const trackDetails = {
        id: track.id,
        name: track.name,
        artist: track.artists.map(artist => artist.name).join(', '),
        album: track.album.name,
        cover_url: track.album.images[0]?.url || '',
        preview_url: track.preview_url || null,
        external_url: track.external_urls.spotify || null,
      };

      // Save to cache
      this.trackCache.set(menfessSpotifyId, trackDetails);

      return trackDetails;
    } catch (error) {
      console.error('Error fetching track details from Spotify:', error.message);
      throw new Error('Failed to fetch track details from Spotify.');
    }
  }
}

module.exports = SpotifyService;
