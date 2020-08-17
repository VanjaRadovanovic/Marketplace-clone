import React from 'react';
import Sidebar from '../Homepage/Sidebar/Sidebar';
import PostForm from './PostForm';

function CreatingPosts() {
  return (
    <div style={{ height: 'calc(100vh - 65.6px)' }}>
      <Sidebar toRender={<PostForm />} heightClass="creating-post-height" />
    </div>
  )
}

export default CreatingPosts
