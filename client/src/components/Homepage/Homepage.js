import React from 'react';
import SideBar from './Sidebar/Sidebar';
import Main from './Main';
import './Homepage.css';
import SidebarMain from './Sidebar/SidebarMain';

function Homepage() {
  return (
    <div className="homepage-container">
      <SideBar toRender={<SidebarMain />} />
      <Main />
    </div>
  )
}

export default Homepage
