import React from 'react';
import SidebarElement from './SidebarElement';
import StoreIcon from '@material-ui/icons/Store';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import './General.css';
import { Link, Route } from 'react-router-dom';

function General({ handleCategoryClick, selectedClass }) {
  return (
    <div>
      <Link to="/" className={selectedClass.all} onClick={e => handleCategoryClick(e, 'all')}>
        <SidebarElement icon={<StoreIcon />} text="Browse all" />
      </Link>
      <Link to="/user/my-posts" className={selectedClass.myAccount} onClick={e => handleCategoryClick(e, 'myAccount')}>
        <SidebarElement icon={<PersonIcon />} text="My account" />
      </Link>
      <Route path="/user/">
        <Link to="/user/my-posts" className={selectedClass.myPosts} onClick={e => handleCategoryClick(e, 'myPosts')}>
          <SidebarElement icon={<LocalOfferIcon />} text="My posts" />
        </Link>
        <Link to="/user/bookmarks" className={selectedClass.bookmarks} onClick={e => handleCategoryClick(e, 'bookmarks')}>
          <SidebarElement icon={<BookmarkIcon />} text="Bookmarks" />
        </Link>
      </Route>
      <Link to="/create-post" className="create-post-button">
        <AddIcon color='primary' /> <div>Add new post</div>
      </Link>
    </div>
  )
}

export default General
