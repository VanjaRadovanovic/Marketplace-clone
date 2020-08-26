import React, { useState, useEffect } from 'react';
import ImagesDisplayer from './ImagesDisplayer';
import InfoSidebar from './InfoSidebar';
import './Index.css';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function Index() {

  const params = useParams();
  const postsList = useSelector(state => state.posts.postsList);
  const [foundPost, setFoundPost] = useState({ imageUrl: '' });

  useEffect(() => {
    Object.values(postsList).forEach(val => {
      if (val.find(val => val._id === params.id) !== undefined) {
        setFoundPost(val.find(val => val._id === params.id))
      }
    });
    console.log(foundPost, 'found post in index')
  }, [params.id])

  return (
    <div className="individual-post-container">
      <ImagesDisplayer data={foundPost} />
      <InfoSidebar />
    </div>
  )
}

export default Index;
