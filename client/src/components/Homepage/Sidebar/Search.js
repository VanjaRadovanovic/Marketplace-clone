import React from 'react';
import './Search.css';
import SearchIcon from '@material-ui/icons/Search';
import PersonIcon from '@material-ui/icons/Person';
import { Link } from 'react-router-dom';
import { CHANGING_SEARCH } from '../../../store/actionTypes';
import { useDispatch, useSelector } from 'react-redux';

function Search() {

  const dispatch = useDispatch();
  const inputValue = useSelector(state => state.search.value);

  const searchOnChange = (e) => {
    dispatch({ type: CHANGING_SEARCH, value: e.target.value })
  }

  return (
    <div className="search-container">
      <div className="search-icons">
        <Link className="search-link" to="/">
          <PersonIcon />
        </Link>
        <Link className="search-link" to="/create-post">Sell</Link>
        <Link className="search-link" to="/">All Categories</Link>
      </div>
      <h3 style={{ textAlign: 'start', paddingLeft: '5px' }}>Marketplace</h3>
      <div className="sidebar-search">
        <SearchIcon color='action' />
        <input placeholder="Search marketplace" value={inputValue} onChange={searchOnChange} />
      </div>
    </div >
  )
}

export default Search
