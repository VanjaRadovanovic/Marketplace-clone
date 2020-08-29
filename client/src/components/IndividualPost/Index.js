import React, { useState, useEffect } from 'react';
import ImagesDisplayer from './ImagesDisplayer';
import InfoSidebar from './InfoSidebar';
import './Index.css';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function Index({ data }) {

  const params = useParams();
  const postsList = useSelector(state => state.posts.postsList);
  const currentUser = useSelector(state => state.currentUser.user)
  const [foundPost, setFoundPost] = useState({ imageUrl: '', title: '', description: '', price: '', category: '', user: {} });
  const formData = useSelector(state => state.posts.postForm)

  useEffect(() => {
    if (data === undefined) {
      Object.values(postsList).forEach(val => {
        if (val.find(val => val._id === params.id) !== undefined) {
          setFoundPost(val.find(val => val._id === params.id))
        }
      });
    } else {
      setFoundPost({ ...data, user: { name: currentUser.username } })
    }
  }, [params.id, data]);

  useEffect(() => {
    if (data === undefined || foundPost.category === '') return;
    let modifiedData = {
      ...data, imageUrl: data.imageUrl.map(val => val)
    }
    if (data.title === '') { modifiedData = { ...modifiedData, title: 'Title' } }
    if (data.price === '') { modifiedData = { ...modifiedData, price: 'Price' } }
    modifiedData = { ...modifiedData, category: [data.category] }
    if (data.location === '') { modifiedData = { ...modifiedData, location: 'Location' } }
    setFoundPost(modifiedData);
  }, [formData])

  return (
    <div className="individual-post-container">
      <ImagesDisplayer data={foundPost} />
      <InfoSidebar data={foundPost} />
    </div>
  )
}

export default Index;
