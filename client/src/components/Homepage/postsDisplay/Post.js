import React, { useState, useEffect } from 'react';
import './Post.css';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { callApi } from '../../../store/actions/api';
import { ADD_BOOKMARK, REMOVE_BOOKMARK } from '../../../store/actionTypes';

function Post({ data }) {

  const history = useSelector(state => state.posts.history);
  const currentUser = useSelector(state => state.currentUser.user);
  const dispatch = useDispatch();
  const [bookmarkedClass, setBookmarkedClass] = useState({ backgroundColor: '#FFF' });

  useEffect(() => {
    if (currentUser.bookmarks === undefined) return;
    if (currentUser.bookmarks.some(val => val === data._id)) {
      setBookmarkedClass({ backgroundColor: '#1878EE', color: 'white', opacity: '1' })
    }
  }, [data])

  const bookmarkPost = (e) => {
    if (currentUser.bookmarks.some(val => val === data._id)) {
      removeBookmark();
      return;
    }
    addBookmark();
  }

  const removeBookmark = async () => {
    let foundUser = await callApi('post', `/api/users/${currentUser.id}/posts/remove-bookmark`, { postId: data._id }, currentUser.token);
    await dispatch({ type: REMOVE_BOOKMARK, bookmarks: foundUser.bookmarks })
    setBookmarkedClass({ backgroundColor: '#FFF', color: 'black' })
    console.log(foundUser)
  }

  const addBookmark = async () => {
    let foundUser = await callApi('post', `/api/users/${currentUser.id}/posts/add-bookmark`, { postId: data._id }, currentUser.token);
    await dispatch({ type: ADD_BOOKMARK, bookmarks: foundUser.bookmarks })
    setBookmarkedClass({ backgroundColor: '#1878EE', color: 'white', opacity: '1' })
  }

  return (
    <Link to={`/posts/${data._id}`}>
      <div className="card post-container" style={{ width: '100%' }}>
        <img src={data.imageUrl[0]} className="card-img-top" alt="err" />
        <div className="img-overlay card-img-top" >
          <Link to={history.path}>
            <button style={bookmarkedClass} className='save-button-on-img' onClick={bookmarkPost}><BookmarkIcon /></button>
          </Link>
        </div>
        <div className="card-body">
          <h5 className="card-title">{data.price} €</h5>
          <p className="card-text">{data.title}</p>
          <p className="location">{data.location}</p>
        </div>
      </div>
    </Link>
  )
}

export default Post;