import React from 'react';
import PropTypes from 'prop-types';
import './SearchBar.css';

class SearchBar extends React.Component{
  constructor(props){
    super(props);
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }
  handleTermChange(e){
    this.setState({term: e.target.value});
  }
  search(){
    this.props.onSearch(this.state.term);
  }
  render(){
    return (
    <div className="SearchBar">
      <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} />
      <a onClick={this.search}>SEARCH</a>
    </div>
  );
  }
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired
};

export default SearchBar;