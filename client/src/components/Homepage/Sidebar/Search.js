import React from 'react';
import './Search.css';
import SearchIcon from '@material-ui/icons/Search';

function Search() {
  return (
    <div className="search-container">
      <h3 style={{ textAlign: 'start', paddingLeft: '5px' }}>Marketplace</h3>
      <div className="sidebar-search">
        <SearchIcon color='action' />
        <input placeholder="Search marketplace" />
      </div>
    </div>
  )
}

export default Search
