import React from 'react';
import SidebarElement from './SidebarElement';
import StoreIcon from '@material-ui/icons/Store';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import './General.css';
import { Link } from 'react-router-dom';

function General() {
  return (
    <div>
      <SidebarElement icon={<StoreIcon />} text="Browse all" />
      <SidebarElement icon={<PersonIcon />} text="Your account" />
      <Link to="/create-post" className="create-post-button">
        <AddIcon color='primary' /> <div>Add new post</div>
      </Link>
    </div>
  )
}

export default General
