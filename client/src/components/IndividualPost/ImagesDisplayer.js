import React, { useState, useEffect } from 'react';
import './ImagesDisplayer.css';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';


function ImagesDisplayer({ data }) {

  const [allImages, setAllImages] = useState([]);
  const [mainImage, setMainImage] = useState('');
  let imageCouner = 0;

  useEffect(() => {
    if (data.imageUrl.length === 0) return;

    setMainImage(<img className="main-image" src={data.imageUrl[imageCouner]} alt="err" />)

    setAllImages(data.imageUrl.map((val, i) => {
      if (i === imageCouner) {
        return <img className="image-list-item" style={{ opacity: '1' }} src={val} alt="err" />
      }
      return <img className="image-list-item" src={val} alt="err" />
    }))

  }, [data, imageCouner])

  return (
    <div className="image-displayer-container">
      <img className="background-image" src={data.imageUrl[0]} alt="err" />
      {mainImage}
      <div className="all-images">
        {allImages}
      </div>
      <div className="changing-images-buttons">
        <button style={{ padding: '8px 5px 8px 12px' }}><ArrowBackIosIcon /></button>
        <button><ArrowForwardIosIcon /></button>
      </div>
    </div>
  )
}

export default ImagesDisplayer
