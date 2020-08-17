import React, { useState, useEffect } from 'react';
import './PostForm.css';
import ClearIcon from '@material-ui/icons/Clear';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';

function PostForm() {

  const [photos, setPhotos] = useState([]);
  const [img, setImg] = useState('');

  const removePhoto = (e, name) => {
    e.preventDefault();
    let filteredData = photos.filter((val) => val.name !== name);
    setPhotos(filteredData);
  }

  useEffect(() => {
    if (photos.length === 0) return
    console.log(photos);
    setImg(photos.map((val, i) => (
      <div className="image-preview-sidebar" key={i}>
        <img src={URL.createObjectURL(val)} />
        <button className="remove-photo-button" onClick={e => removePhoto(e, val.name)}><ClearIcon /></button>
      </div>
    )))
  }, [photos])

  return (
    <div style={{ marginTop: '30px' }}>
      <form>
        <div className="form-group ">
          <p className="photo-input-warning">Photos :  {photos.length} / 10 - You can add no more then 10 photos.</p>
          <div className="photo-input-empty">
            {photos.length === 0 ? (
              <>
                <label htmlFor="photo-input"><div className="photo-input-continer"><div className="add-photo-button-empty"><AddToPhotosIcon style={{ marginRight: '5px' }} />Add New Photo</div></div></label>
                <input type="file" accept=".jgp, .jpeg, .png, .gif, .tiff, .psd, .eps, .ai, .raw, .indd" className="form-control-file file-input" id="photo-input" onChange={e => photos.length < 10 ? setPhotos([...photos, e.target.files[0]]) : null} />
              </>
            ) : (
                <div className="img-preview-sidebar-container">
                  {img}
                  {photos.length < 10 ? (
                    <div className="image-preview-sidebar">
                      <label className="photo-input-just-button" htmlFor="photo-input"><div className="add-photo-button"><small><AddToPhotosIcon />Add new photo</small></div></label>
                      <input type="file" accept=".jgp, .jpeg, .png, .gif, .tiff, .psd, .eps, .ai, .raw, .indd" className="form-control-file file-input" id="photo-input" onChange={e => photos.length < 10 ? setPhotos([...photos, e.target.files[0]]) : null} />
                    </div>
                  ) : null}
                </div>
              )}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="title-input">Title</label>
          <input type="text" className="form-control" id="title-input" />
        </div>
        <div className="form-group">
          <label htmlFor="price-input">Price</label>
          <input type="text" className="form-control" id="price-input" />
        </div>
        <div className="form-group">
          <label htmlFor="category-input">Category</label>
          <select className="form-control" id="category-input">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="description-input">Description</label>
          <textarea className="form-control" id="description-input" rows="3"></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="location-input">Location</label>
          <input type="text" className="form-control" id="location-input" />
        </div>
        <button className="btn btn-primary">Post</button>
      </form>
    </div>
  )
}

export default PostForm;
