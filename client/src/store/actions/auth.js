import { callApi } from './api';
import { SET_CURRENT_USER } from '../actionTypes';
import { useDispatch } from 'react-redux';

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  }
}

export function authUser(type, userData) {

}