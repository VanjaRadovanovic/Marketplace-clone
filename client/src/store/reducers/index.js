import { combineReducers } from 'redux';
import currentUser from './currentUser';
import errors from './errors';
import posts from './posts';

const rootReducer = combineReducers({ currentUser, errors, posts });

export default rootReducer;