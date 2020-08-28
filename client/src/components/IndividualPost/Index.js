import React, { useState, useEffect } from 'react';
import ImagesDisplayer from './ImagesDisplayer';
import InfoSidebar from './InfoSidebar';
import './Index.css';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function Index({ data }) {

  const params = useParams();
  const postsList = useSelector(state => state.posts.postsList);
  const [foundPost, setFoundPost] = useState({ imageUrl: '', title: '', description: '', price: '', category: '', user: {} });

  useEffect(() => {
    console.log(postsList, 'postsList')
    if (data === undefined) {
      Object.values(postsList).forEach(val => {
        if (val.find(val => val._id === params.id) !== undefined) {
          setFoundPost(val.find(val => val._id === params.id))
        }
      });
    } else {
      setFoundPost({ ...data, user: { name: 'paco' } })
    }
  }, [params.id, data])

  return (
    <div className="individual-post-container">
      <ImagesDisplayer data={foundPost} />
      <InfoSidebar data={foundPost} />
    </div>
  )
}

export default Index;
