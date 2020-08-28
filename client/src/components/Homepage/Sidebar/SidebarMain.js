import React, { useState, useEffect } from 'react';
import Search from './Search';
import General from './General';
import Category from './Category';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CHANGE_PATH } from '../../../store/actionTypes';

function SidebarMain() {

  const [selectedClass, setSelectedClass] = useState({ search: '', all: 'selected-category', myAccount: '', vehicles: '', realEstate: '', freeStuff: '', electronics: '', musicalInstruments: '', gamesAndToys: '', householdSupplies: '', family: '', pets: '', homeDecorationSupplies: '', sports: '', fun: '' })
  const searchValue = useSelector(state => state.search.value);
  const history = useHistory();
  const dispatch = useDispatch();
  const pathHistory = useSelector(state => state.posts.history);
  const [chooseCategoryPopup, setChooseCategoryPopup] = useState(false);

  const handleCategoryClick = async (e, cat, path = pathHistory.path) => {
    let categories = { myPosts: '', bookmarks: '', search: '', all: '', myAccount: '', vehicles: '', realEstate: '', freeStuff: '', electronics: '', musicalInstruments: '', gamesAndToys: '', householdSupplies: '', family: '', pets: '', homeDecorationSupplies: '', sports: '', fun: '' };
    categories = { ...categories, [cat]: 'selected-category' }
    setChooseCategoryPopup(false);
    await dispatch({ type: CHANGE_PATH, history: { path, class: cat } })
    setSelectedClass(categories);
  }

  useEffect(() => {
    if (pathHistory === undefined) return
    if (searchValue === '') {
      handleCategoryClick(null, pathHistory.class);
      history.push(`${pathHistory.path}`);
    } else {
      handleCategoryClick(null, null);
      history.push("/search");
    }
  }, [searchValue])

  return (
    <>
      <Search handleCategoryClick={handleCategoryClick} selectedClass={selectedClass} setChooseCategoryPopup={setChooseCategoryPopup} chooseCategoryPopup={chooseCategoryPopup} />
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
