import React from 'react';
import PropTypes from 'prop-types';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

class Playlist extends React.Component{
  constructor(props){
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }
  handleNameChange(e){
    this.props.onNameChange(e.target.value);
  }
  renderSaveButton(){
    if(this.props.savingToSpotify){
      return (<a className="Playlist-save-disabled">SAVING TO SPOTIFY</a>);
    } else {
      return (<a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>);
    }
  }
  render(){
    return(
    <div className="Playlist">
      <input value={this.props.playlistName} onChange={this.handleNameChange}/>
      <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval={true} onPlay={this.props.onPlay} />
      {this.renderSaveButton()}
    </div>
  );
  }
}

Playlist.propTypes = {
  playlistName: PropTypes.string.isRequired,
  playlistTracks: PropTypes.array.isRequired,
  onRemove: PropTypes.func.isRequired,
  onNameChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onPlay: PropTypes.func.isRequired,
  savingToSpotify: PropTypes.bool.isRequired
};

export default Playlist;
