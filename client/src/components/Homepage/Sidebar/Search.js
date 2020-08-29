import React, { useEffect } from 'react';
import './Search.css';
import SearchIcon from '@material-ui/icons/Search';
import PersonIcon from '@material-ui/icons/Person';
import { Link, Route } from 'react-router-dom';
import { CHANGING_SEARCH } from '../../../store/actionTypes';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import Category from '../Sidebar/Category';
import SidebarElement from '../Sidebar/SidebarElement';
import StoreIcon from '@material-ui/icons/Store';
import CloseIcon from '@material-ui/icons/Close';
import BookmarkIcon from '@material-ui/icons/Bookmark';

function Search({ handleCategoryClick, selectedClass, setChooseCategoryPopup, chooseCategoryPopup }) {

  const dispatch = useDispatch();
  const inputValue = useSelector(state => state.search.value);
  const path = useSelector(state => state.posts.history.path)

  const searchOnChange = (e) => {
    dispatch({ type: CHANGING_SEARCH, value: e.target.value })
  }

  useEffect(() => {
    dispatch({ type: CHANGING_SEARCH, value: '' })
  }, [path])

  return (
    <div className="search-container">
      <div className="search-icons">
        <Link className={`search-link ${selectedClass.myAccount}`} to="/user/my-posts" onClick={e => handleCategoryClick(null, 'myAccount', '/user/my-posts')}>
          <PersonIcon />
        </Link>
        <Route path="/user">
          <Link className={`search-link ${selectedClass.bookmarks}`} to="/user/bookmarks" onClick={e => handleCategoryClick(null, 'bookmarks', '/user/bookmarks')}>
            <BookmarkIcon />
          </Link>
        </Route>
        <Link className="search-link" to={{
          pathname: "/create-post",
          state: {
            update: false,
            data: {}
          }
        }}>Sell</Link>
        <p className="search-link" onClick={e => setChooseCategoryPopup(true)}>Categories</p>
      </div>
      <h3 style={{ textAlign: 'start', paddingLeft: '5px' }}>Marketplace</h3>
      <div className="sidebar-search">
        <SearchIcon color='action' />
        <input placeholder="Search marketplace" value={inputValue} onChange={searchOnChange} />
      </div>
      <Modal className="category-popup" isOpen={chooseCategoryPopup} >
        <div className="category-popup-container">
          <button onClick={e => setChooseCategoryPopup(false)}><CloseIcon /></button>
          <h4>Choose a category</h4>
          <hr></hr>
          <Link to="/" className={selectedClass.all} onClick={e => handleCategoryClick(e, 'all', "/")}>
            <SidebarElement icon={<StoreIcon />} text="Browse all" />
          </Link>
          <Category handleCategoryClick={handleCategoryClick} selectedClass={selectedClass} />
        </div>
      </Modal>
    </div >
  )
}

export default Search
