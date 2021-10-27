import {
  GET_USERS,
  ADD_USER,
  SET_CURRENT,
  SET_CURRENT_PAGE,
  CLEAR_CURRENT,
  UPDATE_USER,
  DELETE_USER,
  USER_ERROR,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    case SET_CURRENT:
      return {
        ...state, // current state
        current: action.payload,
      };
    default:
      return state;
  }
};
