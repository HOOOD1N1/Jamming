const clientId = '';
const redirectURI = 'http://localhost:3000/callback/';
let accessToken;
const Spotify = {
    search(term) {
        const accessToken = Spotify.getAccesToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if (!jsonResponse.tracks) {
                return [];
            } else {
                return jsonResponse.tracks.items.map(track => ({
                    id: track.id,
                    name: track.name,
                    artists: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri
                }));
            }
        });
    },

    getAccesToken() {
        if (accessToken) {
            return accessToken;
        } else {
            //check for access token match
            //window.location.href returns the url for the site
            const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
            const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

            if (accessTokenMatch && expiresInMatch) {
                accessToken = accessTokenMatch[1];
                const expiresIn = Number(expiresInMatch[1]);
                window.setTimeout(() => accessToken = '', expiresIn * 1000);
                window.history.pushState('Access Token', null, '/');
                return accessToken;
            } else {
                const accessURL = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
                window.location = accessURL;
            }

        }


    },
    savePlaylist(playlistName, trackUris) {
        let accessToken = Spotify.getAccesToken();
        const headers = {
            Authorization: `Bearer ${accessToken}`
        };
        let userId;

        if (!playlistName && !trackUris.length) {
            return;
        }

        return fetch(`https://api.spotify.com/v1/me`, { headers: headers })
            .then(response => response.json())
            .then(responseJson => {
                userId = responseJson.id;
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                        headers: headers,
                        method: 'POST',
                        body: JSON.stringify({ name: playlistName })
                    }).then(response => response.json())
                    .then(responseJson => {
                        const playlistId = responseJson.id;
                        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                            headers: headers,
                            method: 'POST',
                            body: JSON.stringify({ uris: trackUris })
                        })
                    });

            })
    }
};
export default Spotify;