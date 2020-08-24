import React, { useState } from 'react';
import Search from './Search';
import General from './General';
import Category from './Category';

function SidebarMain() {

  const [selectedClass, setSelectedClass] = useState({ search: '', all: 'selected-category', myAccount: '', vehicles: '', realEstate: '', freeStuff: '', electronics: '', musicalInstruments: '', gamesAndToys: '', householdSupplies: '', family: '', pets: '', homeDecorationSupplies: '', sports: '', fun: '' })

  const handleCategoryClick = (e, cat) => {
    let categories = { search: '', all: '', myAccount: '', vehicles: '', realEstate: '', freeStuff: '', electronics: '', musicalInstruments: '', gamesAndToys: '', householdSupplies: '', family: '', pets: '', homeDecorationSupplies: '', sports: '', fun: '' };
    categories = { ...categories, [cat]: 'selected-category' }
    setSelectedClass(categories);
  }

  const searchOnChange = (e) => {
    console.log(e.target.value);
    e.target.value.lenght === 0 ? handleCategoryClick(null, 'all') : handleCategoryClick(null, null);

  }

  return (
    <>
      <Search searchOnChange={searchOnChange} />
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
