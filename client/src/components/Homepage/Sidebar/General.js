import React from 'react';
import SidebarElement from './SidebarElement';
import StoreIcon from '@material-ui/icons/Store';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import './General.css';
import { Link } from 'react-router-dom';

function General({ handleCategoryClick, selectedClass }) {
  return (
    <div>
      <Link to="/" className={selectedClass.all} onClick={e => handleCategoryClick(e, 'all')}>
        <SidebarElement icon={<StoreIcon />} text="Browse all" />
      </Link>
      <Link to="/user/menu" className={selectedClass.myAccount} onClick={e => handleCategoryClick(e, 'myAccount')}>
        <SidebarElement icon={<PersonIcon />} text="Your account" />
      </Link>
      <Link to="/create-post" className="create-post-button">
        <AddIcon color='primary' /> <div>Add new post</div>
      </Link>
    </div>
  )
}

export default General
