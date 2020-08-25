import { combineReducers } from 'redux';
import currentUser from './currentUser';
import errors from './errors';
import posts from './posts';
import { CHANGING_SEARCH } from '../actionTypes';

const search = (state = { value: '' }, action) => {
  switch (action.type) {
    case CHANGING_SEARCH:
      return {
        ...state,
        value: action.value
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({ currentUser, errors, posts, search });

export default rootReducer;