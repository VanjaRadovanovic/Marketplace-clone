import React, { useState, useEffect } from 'react';
import Search from './Search';
import General from './General';
import Category from './Category';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function SidebarMain() {

  const [selectedClass, setSelectedClass] = useState({ search: '', all: 'selected-category', myAccount: '', vehicles: '', realEstate: '', freeStuff: '', electronics: '', musicalInstruments: '', gamesAndToys: '', householdSupplies: '', family: '', pets: '', homeDecorationSupplies: '', sports: '', fun: '' })
  const searchValue = useSelector(state => state.search.value);
  const history = useHistory();

  const handleCategoryClick = (e, cat) => {
    let categories = { myPosts: '', bookmarks: '', search: '', all: '', myAccount: '', vehicles: '', realEstate: '', freeStuff: '', electronics: '', musicalInstruments: '', gamesAndToys: '', householdSupplies: '', family: '', pets: '', homeDecorationSupplies: '', sports: '', fun: '' };
    categories = { ...categories, [cat]: 'selected-category' }
    setSelectedClass(categories);
  }

  useEffect(() => {
    if (searchValue === '') {
      handleCategoryClick(null, 'all');
      history.push("/");
    } else {
      handleCategoryClick(null, null);
      history.push("/search");
    }
  }, [searchValue])

  return (
    <>
      <Search handleCategoryClick={handleCategoryClick} selectedClass={selectedClass} />
      <div className="sidebar-overflow">
        <hr style={{ borderTop: '1px solid rgba(0,0,0,.15)', marginTop: '0' }} />
        <General handleCategoryClick={handleCategoryClick} selectedClass={selectedClass} />
        <hr style={{ borderTop: '1px solid rgba(0,0,0,.15)' }} />
        <Category handleCategoryClick={handleCategoryClick} selectedClass={selectedClass} />
      </div>
    </>
  )
}

export default SidebarMain
