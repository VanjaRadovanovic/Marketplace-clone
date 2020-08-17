import React from 'react';
import Search from './Search';
import General from './General';
import Category from './Category';

function SidebarMain() {
  return (
    <>
      <Search />
      <div className="sidebar-overflow">
        <hr style={{ borderTop: '1px solid rgba(0,0,0,.15)', marginTop: '0' }} />
        <General />
        <hr style={{ borderTop: '1px solid rgba(0,0,0,.15)' }} />
        <Category />
      </div>
    </>
  )
}

export default SidebarMain
