import React from 'react';
import PropTypes from 'prop-types';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends React.Component{
  render(){
    return(
    <div className="TrackList">
        {this.props.tracks.map(track => {
          return (<Track key={track.id} track={track} onAdd={this.props.onAdd} onRemove={this.props.onRemove} isRemoval={this.props.isRemoval} onPlay={this.props.onPlay} />);
        })}
    </div>
  );
  }
}

TrackList.propTypes = {
  tracks: PropTypes.array.isRequired,
  onAdd: PropTypes.func,
  onRemove: PropTypes.func,
  onPlay: PropTypes.func.isRequired,
  isRemoval: PropTypes.bool.isRequired
};

export default TrackList;
