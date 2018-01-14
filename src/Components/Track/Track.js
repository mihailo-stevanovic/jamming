import React from 'react';
import PropTypes from 'prop-types';
import './Track.css';

class Track extends React.Component{
  constructor(props){
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.handlePlay = this.handlePlay.bind(this);    
  }
  renderAction(){
    if(this.props.isRemoval){
      return (<a className="Track-action" onClick={this.removeTrack}>-</a>);
    } else {
      return (<a className="Track-action" onClick={this.addTrack}>+</a>);
    }
  }
  addTrack(){
    this.props.onAdd(this.props.track);
  }
  removeTrack(){
    this.props.onRemove(this.props.track);
  }
  handlePlay(e){
    this.props.onPlay(e.target);
  }
  renderPreviewAudio(){
    if(this.props.track.previewUrl === null){
      let alternativeLink = "";
      if(this.props.track.spotifyLink !== null){
        alternativeLink = (<a href={this.props.track.spotifyLink} target="_blank">Play on Spotify instead.</a>)
      }
      return (<p>Preview not available. {alternativeLink}</p>);
    } else {
      return (
        <audio controls src={this.props.track.previewUrl} onPlay={this.handlePlay}>
        Audio preview is not supported by your browser
        </audio>);
    }
  }
  render(){
    return (
    <div className="Track">
      <div className="Track-information">
        <h3>{this.props.track.name}</h3>
        <p>{this.props.track.artist} | {this.props.track.album}</p>
        {this.renderPreviewAudio()}
      </div>
      {this.renderAction()}
    </div>
  );
  }
}

Track.propTypes = {
  track: PropTypes.object.isRequired,
  onAdd: PropTypes.func,
  onRemove: PropTypes.func,
  onPlay: PropTypes.func.isRequired,
  isRemoval: PropTypes.bool.isRequired
};

export default Track;
