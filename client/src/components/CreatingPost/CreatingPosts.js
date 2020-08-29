import React, { useState, useEffect } from 'react';
import Sidebar from '../Homepage/Sidebar/Sidebar';
import PostForm from './PostForm';
import Preview from '../IndividualPost/Index';
import { useSelector } from 'react-redux';

function CreatingPosts(props) {

  const formData = useSelector(state => state.posts.postForm);
  const [modData, setModData] = useState(formData);
  const { data, update } = props.location.state;

  useEffect(() => {
    let modifiedData;
    if (update === true && formData.title === '') {
      modifiedData = {
        ...data, imageUrl: data.imageUrl.map(val => {
          if (val.name !== undefined) return URL.createObjectURL(val);
          return val;
        })
      };
      setModData(data);
      return
    }
    setModData(modifiedData)
  }, [data])

  return (
    <div style={{ height: 'calc(100vh - 65.6px)', display: 'flex', position: 'absolute', zIndex: '-2' }}>
      <Sidebar toRender={<PostForm data={modData} update={update} />} heightClass="creating-post-height" />
      <div className="preview-post">
        <Preview data={{
          ...formData, imageUrl: formData.imageUrl.map(val => {
            if (val.name !== undefined) return URL.createObjectURL(val);
            return val;
          }), user: { name: '' }
        }} />
      </div>
    </div>
  )
}

export default CreatingPosts
