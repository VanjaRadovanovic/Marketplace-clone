import React, { useState } from 'react';
import './Post.css';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import Modal from 'react-modal';
import { REMOVE_POST } from '../../store/actionTypes';
import { useSelector, useDispatch } from 'react-redux';
import { callApi } from '../../store/actions/api';
import { Link } from 'react-router-dom';

function Post({ data }) {

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const dispatch = useDispatch();
  const postsList = useSelector(state => state.posts.postsList);
  const currentUser = useSelector(state => state.currentUser.user)

  const deletePost = async (e) => {
    const category = gettingCategory(data.category[0])
    const filteredData = { ...postsList, [category]: postsList[category].filter(val => val._id !== data._id) };
    await dispatch({ type: REMOVE_POST, postsList: filteredData })
    const post = await callApi('delete', `/api/users/${currentUser.id}/posts/${data._id}`, {}, currentUser.token);
    await setModalIsOpen(false);
  }

  const gettingCategory = (cat) => {
    let category = cat.split(' ').map((val, index) => {
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
    return category;
  }

  return (
    <div className="my-post-container">
      <div className="my-post-info">
        <img src={data.imageUrl[0]} alt="err" />
        <div>
          <h4>{data.title}</h4>
          <h5>{data.price} €</h5>
        </div>
      </div>
      <div className="my-post-buttons">
        <Link className="update-button" to={{
          pathname: `/user/my-posts/update/${data._id}`,
          state: {
            data,
            update: true
          }
        }}>
          <CreateIcon /><p>Update</p>
        </Link>
        <button className="delete-button" onClick={e => setModalIsOpen(true)}><DeleteIcon /></button>
      </div>
      <Modal className="deleting-popup" isOpen={modalIsOpen}>
        <div className="deleting-popup-container">
          <h5 style={{ textAlign: 'center' }}>Are you shure you want to delete post?</h5>
          <div className="deleting-popup-buttons">
            <button onClick={e => setModalIsOpen(false)}>Cancel</button>
            <button className="popup-delete-button" onClick={e => deletePost(e)}>Delete</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Post
