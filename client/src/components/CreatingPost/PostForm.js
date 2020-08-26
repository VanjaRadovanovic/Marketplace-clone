import React, { useState, useEffect } from 'react';
import './PostForm.css';
import ClearIcon from '@material-ui/icons/Clear';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import { useSelector, useDispatch } from 'react-redux';
import { TextareaAutosize } from '@material-ui/core';
import { CHANGING_POSTS_FORM, ADD_POST } from '../../store/actionTypes';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

function PostForm() {

  const [img, setImg] = useState('');
  const [categoriesEl, setCategoriesEl] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState('button-disabled');
  const [errForm, setErrForm] = useState({ title: { message: '', outline: '' }, price: { message: '', outline: '' }, description: { message: '', outline: '' } })
  const categories = useSelector(state => state.posts.categories);
  const formData = useSelector(state => state.posts.postForm);
  const postsList = useSelector(state => state.posts.postsList);
  const currentUser = useSelector(state => state.currentUser)
  const dispatch = useDispatch();
  const [submited, setSubmited] = useState(false);

  useEffect(() => {
    setCategoriesEl(categories.map((val, i) => (
      <option key={i}>{val}</option>
    )))
  }, [categories])

  const changingInput = (e, input) => {
    if (input === 'price') {
      if (isNaN(parseInt(e.target.value[e.target.value.length - 1]))) return;
      setErrForm({ ...errForm, price: { message: 'Price cannot be grader then 999 999 999', outline: 'is-invalid' } })
      if (e.target.value > 999999999) return
    }
    if (input === 'title') {
      if (e.target.value.length > 50) {
        setErrForm({ ...errForm, title: { message: 'Title can not be longer then 50 caracters', outline: 'is-invalid' } })
        return
      }
    }
    if (input === 'description') {
      if (e.target.value.length > 6000) {
        setErrForm({ ...errForm, description: { message: 'Description can not be longer then 6000 caracters', outline: 'is-invalid' } })
        return
      }
    }
    setErrForm({ description: { message: 'Descrition is optional', outline: '' }, price: { message: '', outline: '' }, title: { message: '', outline: '' } })
    let modifiedData = {
      ...formData,
      [input]: e.target.value
    }
    dispatch({ type: CHANGING_POSTS_FORM, formData: modifiedData });

    undesableSubmitCheck(modifiedData);
  }

  useEffect(() => {
    setImg(formData.imageUrl.map((val, i) => (
      <div className="image-preview-sidebar" key={i}>
        <img src={URL.createObjectURL(val)} alt="IMG" />
        <button className="remove-photo-button" onClick={e => removePhoto(e, val.name, formData)}><ClearIcon /></button>
      </div>
    )))
  }, [formData])

  const undesableSubmitCheck = (formData) => {
    setButtonDisabled('button-disabled');
    if (formData.imageUrl.length < 1) return;
    if (formData.title.length === 0 || formData.title > 100) return;
    if (formData.price.length === 0) return;
    if (formData.description.lenght > 400) return;
    if (formData.location.length === 0) return;

    setButtonDisabled('');
  }

  const addingPhotos = (e) => {
    let formDataModified = { ...formData, imageUrl: [...formData.imageUrl, e.target.files[0]] };
    if (formData.imageUrl.length < 10) {
      dispatch({ type: CHANGING_POSTS_FORM, formData: formDataModified })
    }
    undesableSubmitCheck(formDataModified);
  }

  const removePhoto = async (e, name) => {
    let filteredData = formData.imageUrl.filter((val) => val.name !== name);
    undesableSubmitCheck({ ...formData, imageUrl: filteredData })
    await dispatch({ type: CHANGING_POSTS_FORM, formData: { ...formData, imageUrl: filteredData } })
  }

  const gettingCategory = () => {
    return formData.category.split(' ').map((val, index) => {
      if (index === 0) {
        return val.toLowerCase();
      }
      let str;
      for (var i = 0; i < val.length; i++) {
        if (i === 0) {
          str = val[i].toUpperCase();
        } else {
          str += val[i].toLowerCase();
        }
      }
      return str;
    }).join('');
  }

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      if (buttonDisabled !== '') return;

      const form = new FormData();
      formData.imageUrl.forEach(val => form.append('imageUrl', val))
      form.append('title', formData.title);
      form.append('price', formData.price);
      form.append('location', formData.location);
      form.append('category', formData.category);
      form.append('description', formData.description);

      let post = await axios.post(`/api/users/${currentUser.user.id}/posts/`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${currentUser.user.token}`,
          'enctype': "multipart/form-data"
        }
      })
      let category = gettingCategory()
      await dispatch({ type: ADD_POST, post: { ...postsList, [category]: [...postsList[category], post.data] } });
      await dispatch({ type: CHANGING_POSTS_FORM, formData: { imageUrl: [], title: '', price: '', category: '', description: '', location: '' } })
      setSubmited(true);
    } catch (err) {
      console.log(err, 'error')
    }
  }

  return (
    <div style={{ marginTop: '30px' }}>
      <form onSubmit={onSubmit} enctype="multipart/form-data" action="/upload">
        <div className="form-group ">
          <p className="photo-input-warning">Photos :  {formData.imageUrl.length} / 10 - You can add no more then 10 photos.</p>
          <div className="photo-input-empty">
            {formData.imageUrl.length === 0 ? (
              <>
                <label htmlFor="photo-input"><div className="photo-input-continer"><div className="add-photo-button-empty"><AddToPhotosIcon style={{ marginRight: '5px' }} />Add New Photo</div></div></label>
                <input type="file" accept=".jpg, .jpeg, .png, .gif, .tiff, .psd, .eps, .ai, .raw, .indd" className="form-control-file file-input" id="photo-input" onChange={addingPhotos} />
                <p className="warning-create-post">Adding at least 1 photo is required</p>
              </>
            ) : (
                <div className="img-preview-sidebar-container">
                  {img}
                  {formData.imageUrl.length < 10 ? (
                    <div className="image-preview-sidebar">
                      <label className="photo-input-just-button" htmlFor="photo-input"><div className="add-photo-button"><small><AddToPhotosIcon />Add new photo</small></div></label>
                      <input type="file" accept=".jpg, .jpeg, .png, .gif, .tiff, .psd, .eps, .ai, .raw, .indd" className="form-control-file file-input" id="photo-input" onChange={addingPhotos} />
                    </div>
                  ) : null}
                </div>
              )}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="title-input">Title</label>
          <input type="text" className={`form-control ${errForm.title.outline}`} id="title-input" value={formData.title} onChange={e => changingInput(e, 'title')} />
          <p style={{ color: 'red' }} className='warning-create-post'>{errForm.title.message}</p>
        </div>
        <div className="form-group">
          <label htmlFor="price-input">Price</label>
          <div style={{ display: 'flex' }}>
            <input type="text" className={`form-control ${errForm.price.outline}`} id="price-input" value={formData.price} onChange={e => changingInput(e, 'price')} />
            <h4 style={{ margin: '2px 0 0 5px', }}>EUR</h4>
          </div>
          <p style={{ color: 'red' }} className='warning-create-post'>{errForm.price.message}</p>
        </div>
        <div className="form-group">
          <label htmlFor="category-input">Category</label>
          <select placeholder="Choose category" className="form-control" id="category-input" value={formData.category} onChange={e => changingInput(e, 'category')}>
            {categoriesEl}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="description-input">Description</label>
          <TextareaAutosize id="description-input" className={`form-control ${errForm.description.outline}`} rowsMin={3} value={formData.description} onChange={e => changingInput(e, 'description')} />
          <p className="warning-create-post">{errForm.description.message}</p>
        </div>
        <div className="form-group">
          <label htmlFor="location-input">Location</label>
          <input type="text" className="form-control" id="location-input" value={formData.location} onChange={e => changingInput(e, 'location')} />
        </div>
        <button style={{ padding: '5px 35px', margin: '10px 0 20px 0' }} className={`btn btn-primary ${buttonDisabled}`}>Post</button>
      </form>
      {submited ? (<Redirect to="/" />) : null}
    </div >
  )
}

export default PostForm;
