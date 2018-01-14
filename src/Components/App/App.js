import React, { Component } from 'react';
import './App.css';
import SearchResults from '../SearchResults/SearchResults';
import SearchBar from '../SearchBar/SearchBar';
import Playlist from '../Playlist/Playlist';
import {Spotify} from '../../util/Spotify.js';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: [],
      savingToSpotify: false
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }
  addTrack(track){
    let tracks = this.state.playlistTracks;
    if(tracks.filter(currentTrack => currentTrack.id===track.id).length < 1){
      tracks.push(track);
      this.setState({playlistTracks: tracks});
    }
  }
  removeTrack(track){
    let tracks = this.state.playlistTracks.filter(currentTrack => currentTrack.id!==track.id);
    this.setState({playlistTracks: tracks});
  }
  updatePlaylistName(name){
    this.setState({playlistName: name});
  }
  async savePlaylist(){
    this.setState({
      savingToSpotify: true
    });

    let isSaved = await Spotify.savePlaylist(this.state.playlistName, this.state.playlistTracks.map(track => track.uri));

    if(isSaved){
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: [],
        savingToSpotify: false
      });
    } else {
      this.setState({
        savingToSpotify: false
      });
    }

  }
  async search(term){
    let searchRes = await Spotify.search(term);
    this.setState({searchResults: searchRes});
  }
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} savingToSpotify={this.state.savingToSpotify} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
