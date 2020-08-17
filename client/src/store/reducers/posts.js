import { ADD_POST, REMOVE_POST, GET_ALL_POSTS } from '../actionTypes';
import { callApi } from '../actions/api';

const DEFAULT_STATE = {
  postsList: [],
  categories: ['Vehicles', 'Real estate', 'Free stuff', 'Electronics', 'Musical instruments', 'Games and toys', 'Household supplies', 'Family', 'Pets', 'Home decoration supplies', 'Sports', 'Fun']
}

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case GET_ALL_POSTS:
      console.log(action.posts, 'this are posts')
      return {
        ...state,
        postsList: action.posts
      }
    default:
      return state;
  }
}