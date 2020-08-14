import { ADD_POST, REMOVE_POST, GET_ALL_POSTS } from '../actionTypes';
import { callApi } from '../actions/api';
import { useSelector } from 'react-redux';

const PREV_STATE = {
  posts: [],
}

const getPosts = async (id, token) => {
  try {
    console.log('in here')
    return await callApi('get', `/api/users/${id}/posts/allmessages`, {}, token);

  } catch (error) {
    console.log(error, 'another error')
  }
}

export default async (state = PREV_STATE, action) => {
  switch (action.type) {
    case GET_ALL_POSTS:
      let posts = await getPosts(action.id, action.token);
      console.log(posts, 'this are posts')
      return {
        ...state,
        posts: posts
      }
    default:
      return state;
  }
}