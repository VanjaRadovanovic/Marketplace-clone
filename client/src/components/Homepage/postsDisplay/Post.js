import React from 'react';
import './Post.css';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import { Link } from 'react-router-dom';


function Post({ data }) {
  return (
    <Link to={`/posts/${data._id}`}>
      <div className="card post-container" style={{ width: '100%' }}>
        <img src={data.imageUrl[0]} className="card-img-top" alt="err" />
        <div className="img-overlay card-img-top" >
          <button className="save-button-on-img"><BookmarkIcon /></button>
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