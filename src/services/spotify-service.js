const axios = require('axios');

class SpotifyService {

  static async getAccessToken() {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    const token = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    console.log('Attempting to get Spotify access token');
    console.log('Client ID:', clientId.substring(0, 5) + '...');
    console.log('Client Secret:', clientSecret.substring(0, 5) + '...');

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
      throw new Error('Failed to fetch song from Spotify.');
    }
  }
}


class SpotifyTrackService {
    static accessToken = null;
    static tokenExpiryTime = null;

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

            const expiresIn = response.data.expires_in * 1000;
            this.accessToken = response.data.access_token;
            this.tokenExpiryTime = Date.now() + expiresIn - 60000;

            return this.accessToken;
        } catch (error) {
            console.error('Error getting Spotify access token:', error.message);
            throw new Error('Failed to authenticate with Spotify');
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
            console.error('Error fetching track details:', error.message);
            return null;
        }
    }
}


  module.exports = {
    SpotifyService,
    SpotifyTrackService
  };