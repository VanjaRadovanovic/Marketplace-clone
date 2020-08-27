import React, { useState, useEffect } from 'react';
import './DisplayByCategory.css';
import { useSelector } from 'react-redux';
import Post from './Post';

function DisplayByCategory({ userCategory, category, numItemsToDisplay }) {

  const posts = useSelector(state => state.posts.postsList);
  const searchValue = useSelector(state => state.search.value);
  const [post, setPost] = useState([]);
  const numberOfItems = numItemsToDisplay;

  useEffect(() => {
    if (posts === {}) return;
    let gettingCategory = category.split(' ').map((val, index) => {
      if (index === 0) {
        return val.toLowerCase();
      }
      let str;
      for (var i = 0; i < val.length; i++) {
        if (i === 0) {
          str = val[i].toUpperCase();
        } else {
          str += val[i].toLowerCase();
        }
      }
      return str;
    }).join('');
    if (posts[gettingCategory] !== undefined) {
      setPost(posts[gettingCategory].filter((val, i) => i < numberOfItems).map((val) => (
        <Post data={val} key={val._id} />
      )));
    } else {
      console.log(posts, 'printing posts')
      const filteredPosts = Object.values(posts).reduce((acc, val) => acc.concat(val.filter(val => val.title.toLowerCase().includes(searchValue.toLowerCase()))), []);
      setPost(filteredPosts.map(val => (
        <Post data={val} key={val._id} />
      )))
    }
  }, [posts, numberOfItems, category])

  return (
    <div>
      <h4 className="category-title">{category}</h4>
      <div className="posts-layout">
        {post}
      </div>
      <hr className="category-divider"></hr>
    </div>
  )
}

export default DisplayByCategory
