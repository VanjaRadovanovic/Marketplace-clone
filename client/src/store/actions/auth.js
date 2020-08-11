import { callApi } from './api';
import { SET_CURRENT_USER } from '../actionTypes';

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  }
}