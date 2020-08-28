import React, { useState, useEffect } from 'react';
import Sidebar from '../Homepage/Sidebar/Sidebar';
import PostForm from './PostForm';
import Preview from '../IndividualPost/Index';
import { useSelector } from 'react-redux';

function CreatingPosts() {

  const formData = useSelector(state => state.posts.postForm);
  const currentUser = useSelector(state => state.currentUser.user)
  const [modifiedData, setModifiedData] = useState(formData);

  useEffect(() => {
    let modifiedData = { ...formData, imageUrl: formData.imageUrl.map(val => URL.createObjectURL(val)) };
    if (formData.title === '') { modifiedData = { ...modifiedData, title: 'Title' } }
    if (formData.price === '') { modifiedData = { ...modifiedData, price: 'Price' } }
    modifiedData = { ...modifiedData, category: [formData.category] }
    if (formData.location === '') { modifiedData = { ...modifiedData, location: 'Location' } }
    console.log(formData, modifiedData)
    setModifiedData(modifiedData)
  }, [formData])

  return (
    <div style={{ height: 'calc(100vh - 65.6px)', display: 'flex', position: 'absolute', zIndex: '-2' }}>
      <Sidebar toRender={<PostForm />} heightClass="creating-post-height" />
      <div className="preview-post">
        <Preview data={modifiedData} />
      </div>
    </div>
  )
}

export default CreatingPosts
