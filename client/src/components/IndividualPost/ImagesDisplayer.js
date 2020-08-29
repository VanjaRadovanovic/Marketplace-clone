import React, { useState, useEffect } from 'react';
import './ImagesDisplayer.css';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';


function ImagesDisplayer({ data }) {

  const [allImages, setAllImages] = useState([]);
  const [mainImage, setMainImage] = useState('');
  let [imageCounter, setImageCounter] = useState(0);

  useEffect(() => {
    if (data.imageUrl.length === 0) return;
    changingImage(imageCounter);
  }, [data])

  const onButtonClickForward = (e) => {
    imageCounter === data.imageUrl.length - 1 ? changingImage(0) : changingImage(imageCounter + 1);

  }

  const onButtonClickBackward = (e) => {
    imageCounter === 0 ? changingImage(data.imageUrl.length - 1) : changingImage(imageCounter - 1);
  }

  const changingImage = (count) => {
    setImageCounter(count)
    setMainImage(<img className="main-image" src={data.imageUrl[count] || null} alt="err" />)
    setAllImages(data.imageUrl.map((val, i) => {
      if (i === count) {
        return <img className="image-list-item" style={{ opacity: '1' }} src={val} alt="err" />
      }
      return <img className="image-list-item" src={val} alt="err" onClick={e => changingImage(i)} />
    }))
  }

  return (
    <div className="image-displayer-container">
      <div className="background-image-container">
        <img className="background-image" src={data.imageUrl[imageCounter]} alt="err" />
      </div>
      {mainImage}
      <div className="all-images">
        {allImages}
      </div>
      {data.imageUrl.length > 0 ? (
        <div className="changing-images-buttons">
          <button style={{ padding: '8px 5px 8px 12px' }} onClick={onButtonClickBackward}><ArrowBackIosIcon /></button>
          <button onClick={onButtonClickForward}><ArrowForwardIosIcon /></button>
        </div>
      ) : null}
    </div>
  )
}

export default ImagesDisplayer
