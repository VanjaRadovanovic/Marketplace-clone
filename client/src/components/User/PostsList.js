import React, { useState, useEffect } from 'react';
import Post from './Post';
import { useSelector } from 'react-redux';

function PostsList({ search }) {

  const currentUserId = useSelector(state => state.currentUser.user.id);
  const allPosts = useSelector(state => state.posts.postsList)
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const filteredPosts = Object.values(allPosts).reduce((acc, val) => acc.concat(val.filter(val => val.user._id === currentUserId)), []);
    if (search === undefined) {
      setPosts(filteredPosts.map(val => (
        <Post data={val} key={val._id} />
      )))
    } else {
      let searchFilter = filteredPosts.filter(val => val.title.toLowerCase().includes(search.toLowerCase()));
      setPosts(searchFilter.map(val => (
        <Post data={val} key={val._id} />
      )))
    }
  }, [currentUserId, allPosts, search])

  return (
    <div style={{ padding: '20px 50px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {posts}
    </div>
  )
}

export default PostsList;
