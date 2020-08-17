import { ADD_POST, REMOVE_POST, GET_ALL_POSTS, CHANGING_POSTS_FORM } from '../actionTypes';
import { callApi } from '../actions/api';

const DEFAULT_STATE = {
  postsList: [],
  categories: ['Vehicles', 'Real estate', 'Free stuff', 'Electronics', 'Musical instruments', 'Games and toys', 'Household supplies', 'Family', 'Pets', 'Home decoration supplies', 'Sports', 'Fun'],
  postForm: {
    photos: [],
    title: '',
    price: '',
    category: '',
    description: '',
    location: ''
  }
}

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case GET_ALL_POSTS:
      return {
        ...state,
        postsList: action.posts
      }
    case ADD_POST:
      return {
        ...state,
        postList: action.post
      }
    case CHANGING_POSTS_FORM:
      console.log(action.formData, 'action')
      return {
        ...state,
        postForm: action.formData
      }
    default:
      return state;
  }
}