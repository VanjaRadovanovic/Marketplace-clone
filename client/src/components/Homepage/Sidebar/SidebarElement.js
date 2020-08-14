import React from 'react';
import './SidebarElement.css';

function SidebarElement({ icon, text }) {
  return (
    <div className="sidebar-element-container">
      <div className="icon-wrapper">
        {icon}
      </div>
      <div>{text}</div>
    </div>
  )
}

export default SidebarElement
