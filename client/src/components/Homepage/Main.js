import React from 'react';
import './Main.css';
import DisplayByCategory from './postsDisplay/DisplayByCategory';
import { useSelector } from 'react-redux';

function Main() {

  const categories = useSelector(state => state.categories);

  return (
    <div className="main-posts-container">
      <DisplayByCategory />
      <DisplayByCategory />
      <DisplayByCategory />
      <DisplayByCategory />
      <DisplayByCategory />
    </div>
  )
}

export default Main
