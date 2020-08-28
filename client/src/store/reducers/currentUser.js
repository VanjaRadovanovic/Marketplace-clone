import { SET_CURRENT_USER, ADD_BOOKMARK, REMOVE_BOOKMARK } from '../actionTypes';

const DEFAULT_STATE = {
  isAuthenticated: false,
  user: {}
}

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: !!Object.keys(action.user).length,
        user: action.user
      }
    case ADD_BOOKMARK:
      return {
        ...state,
        user: { ...state.user, bookmarks: action.bookmarks }
      }
    case REMOVE_BOOKMARK:
      return {
        ...state,
        user: { ...state.user, bookmarks: action.bookmarks }
      }
    default:
      return state;
  }
}