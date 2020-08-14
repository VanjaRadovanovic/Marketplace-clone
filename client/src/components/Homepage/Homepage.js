import React from 'react';
import SideBar from './Sidebar/Sidebar';
import Main from './Main';
import './Homepage.css'

function Homepage() {
  return (
    <div className="homepage-container">
      <SideBar />
      <Main />
    </div>
  )
}

export default Homepage
