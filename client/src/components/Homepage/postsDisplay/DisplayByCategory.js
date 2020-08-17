import React, { useState, useEffect } from 'react';
import './DisplayByCategory.css';
import { useSelector } from 'react-redux';
import Post from './Post';

function DisplayByCategory() {

  const posts = useSelector(state => state.posts.postsList);
  const [post, setPost] = useState([]);

  useEffect(() => {
    if (posts.length === 0) return;
    console.log(posts, 'This are posts categories');
    let postJsx = posts.map((val) => (
      <Post data={val} key={val._id} />
    ))
    setPost(postJsx);
  }, [posts])

  return (
    <div>
      <h4 className="category-title">Todays choice for you</h4>
      <div className="posts-layout">
        {post}
      </div>
      <hr className="category-divider"></hr>
    </div>
  )
}

export default DisplayByCategory
