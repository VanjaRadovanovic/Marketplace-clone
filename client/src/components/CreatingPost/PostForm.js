import React, { useState, useEffect } from 'react';
import './PostForm.css';
import ClearIcon from '@material-ui/icons/Clear';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import { useSelector, useDispatch } from 'react-redux';
import { TextareaAutosize } from '@material-ui/core';
import { CHANGING_POSTS_FORM } from '../../store/actionTypes';

function PostForm() {

  const [photos, setPhotos] = useState([]);
  const [img, setImg] = useState('');
  const [categoriesEl, setCategoriesEl] = useState('');
  const categories = useSelector(state => state.posts.categories);
  const formData = useSelector(state => state.posts.postForm);
  const dispatch = useDispatch();

  const removePhoto = (e, name) => {
    e.preventDefault();
    let filteredData = formData.photos.filter((val) => val.name !== name);
    dispatch({ type: CHANGING_POSTS_FORM, formData: { ...formData, photos: filteredData } })
  }

  useEffect(() => {
    setCategoriesEl(categories.map((val, i) => (
      <option key={i}>{val}</option>
    )))
    console.log(formData, 'postform')
  }, [])

  const changingInput = (e, input) => {
    console.log(e.target.value)
    console.log(formData, 'formData')
    let modifiedData = {
      ...formData,
      [input]: e.target.value
    }
    dispatch({ type: CHANGING_POSTS_FORM, formData: modifiedData })
  }

  useEffect(() => {
    if (formData.photos.length === 0) return
    console.log(formData.photos, 'this photos');
    setImg(formData.photos.map((val, i) => (
      <div className="image-preview-sidebar" key={i}>
        <img src={URL.createObjectURL(val)} />
        <button className="remove-photo-button" onClick={e => removePhoto(e, val.name)}><ClearIcon /></button>
      </div>
    )))
  }, [formData.photos])

  return (
    <div style={{ marginTop: '30px' }}>
      <form>
        <div className="form-group ">
          <p className="photo-input-warning">Photos :  {formData.photos.length} / 10 - You can add no more then 10 photos.</p>
          <div className="photo-input-empty">
            {formData.photos.length === 0 ? (
              <>
                <label htmlFor="photo-input"><div className="photo-input-continer"><div className="add-photo-button-empty"><AddToPhotosIcon style={{ marginRight: '5px' }} />Add New Photo</div></div></label>
                <input type="file" accept=".jgp, .jpeg, .png, .gif, .tiff, .psd, .eps, .ai, .raw, .indd" className="form-control-file file-input" id="photo-input" onChange={e => formData.photos.length < 10 ? dispatch({ type: CHANGING_POSTS_FORM, formData: { ...formData, photos: [...formData.photos, e.target.files[0]] } }) : null} />
              </>
            ) : (
                <div className="img-preview-sidebar-container">
                  {img}
                  {formData.photos.length < 10 ? (
                    <div className="image-preview-sidebar">
                      <label className="photo-input-just-button" htmlFor="photo-input"><div className="add-photo-button"><small><AddToPhotosIcon />Add new photo</small></div></label>
                      <input type="file" accept=".jgp, .jpeg, .png, .gif, .tiff, .psd, .eps, .ai, .raw, .indd" className="form-control-file file-input" id="photo-input" onChange={e => formData.photos.length < 10 ? dispatch({ type: CHANGING_POSTS_FORM, formData: { ...formData, photos: [...formData.photos, e.target.files[0]] } }) : null} />
                    </div>
                  ) : null}
                </div>
              )}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="title-input">Title</label>
          <input type="text" className="form-control" id="title-input" value={formData.title} onChange={e => changingInput(e, 'title')} />
        </div>
        <div className="form-group">
          <label htmlFor="price-input">Price</label>
          <input type="text" className="form-control" id="price-input" value={formData.price} onChange={e => changingInput(e, 'price')} />
        </div>
        <div className="form-group">
          <label htmlFor="category-input">Category</label>
          <select className="form-control" id="category-input" value={formData.category} onChange={e => changingInput(e, 'category')}>
            {categoriesEl}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="description-input">Description</label>
          <TextareaAutosize id="description-input" className="form-control" rowsMin={3} value={formData.description} onChange={e => changingInput(e, 'description')} />
        </div>
        <div className="form-group">
          <label htmlFor="location-input">Location</label>
          <input type="text" className="form-control" id="location-input" value={formData.location} onChange={e => changingInput(e, 'location')} />
        </div>
        <button style={{ padding: '5px 35px', marginTop: '10px' }} className="btn btn-primary">Post</button>
      </form>
    </div>
  )
}

export default PostForm;
