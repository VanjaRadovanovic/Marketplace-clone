import React from 'react';
import './Sidebar.css';



function Sidebar(props) {
  return (
    <div className={`sidebar-container ${props.heightClass}`}>
      <div className="homepage-sidebar">
        {props.toRender}
      </div>
    </div>
  )
}

export default Sidebar
