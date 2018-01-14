let accessToken;
const cliendId = '676ac45ccf9642d8af38978e18217c52';
const redirectUri = 'https://jamming-mihailo.surge.sh/';
const apiUrl = 'https://api.spotify.com/v1/';
const crossUrl = 'https://cors-anywhere.herokuapp.com/';

let Spotify = {
  getAccessToken: function(){
    if(accessToken){
      return accessToken;
    } else if (window.location.href.match(/access_token=([^&]*)/)){
      accessToken = (window.location.href.match(/access_token=([^&]*)/))[1];
      let expiresIn = (window.location.href.match(/expires_in=([^&]*)/))[1];
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      let scopes = "playlist-modify-private playlist-modify-public";
      let url = `https://accounts.spotify.com/authorize?client_id=${cliendId}&response_type=token&scope=${encodeURIComponent(scopes)}&redirect_uri=${redirectUri}`;
      window.location.assign(url);
    }
  },
  search: function(term){
    let searchUrl = `${apiUrl}search?type=track&q=${term}`;
    try{
      return fetch(searchUrl,{
        headers: {Authorization: `Bearer ${this.getAccessToken()}`}
      })
      .then(response => response.json(), rejection => {
        throw new Error(rejection);
      })
      .then(jsonResponse => {
        return jsonResponse.tracks.items.map(track => {
          return {
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri,
            previewUrl: track.preview_url,
            spotifyLink: track.external_urls.spotify
          }
        })
      }, rejection => {
        throw new Error(rejection);
      });
    }
    catch(error){
      console.log(error);
      return [];
    }
  },
  savePlaylist: async function(playlistName, trackUris){
    if(playlistName==='' || trackUris.length === 0){
      return;
    }
    let userAccessToken = this.getAccessToken();
    try{
      if(userAccessToken === undefined){
        throw new Error("userAccessToken is undefined");
      }
      let headers = {Authorization: `Bearer ${userAccessToken}`};

      //GET https://api.spotify.com/v1/me
      let userId = await fetch(`${crossUrl}${apiUrl}me`,{headers: headers})
      .then(response => response.json(), rejection => {
        throw new Error(rejection);
      })
      .then(jsonResponse => jsonResponse.id, rejection => {
        throw new Error(rejection);
      });

      if(userId === undefined){
        throw new Error('userId is undefined');
      }
      headers['Content-Type'] = 'application/json';

      //POST https://api.spotify.com/v1/users/{user_id}/playlists
      let playlistId = await fetch(`${crossUrl}${apiUrl}users/${userId}/playlists`,{
        method: 'POST',
        body: JSON.stringify({name: playlistName}),
        headers: headers
      })
      .then(response => response.json(), rejection => {
        throw new Error(rejection);
      })
      .then(jsonResponse => jsonResponse.id, rejection => {
        throw new Error(rejection);
      });

      if(playlistId === undefined){
        throw new Error('playlistId is undefined');
      }

      //POST https://api.spotify.com/v1/users/{user_id}/playlists/{playlist_id}/tracks
      return await fetch(`${crossUrl}${apiUrl}users/${userId}/playlists/${playlistId}/tracks`,{
        method: 'POST',
        body: JSON.stringify({"uris": trackUris}),
        headers: headers
      }).then(response => {
        return response.ok;
      }, rejection => {
        throw new Error(rejection);
      });
    }
    catch(error){
      console.log(error);
      return false;
    }
  }
}

export {Spotify};
