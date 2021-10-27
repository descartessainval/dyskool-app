import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthentificated: true,
        loading: false,
        user: action.payload,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuthentificated: true,
        loading: false,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthentificated: true,
        loading: false,
      };
    case REGISTER_FAIL:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthentificated: false,
        loading: false,
        user: null,
        error: action.payload,
      };
    case LOGIN_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthentificated: false,
        loading: false,
        user: null,
        error: action.payload,
      };
    case AUTH_ERROR:
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthentificated: false,
        loading: false,
        user: null,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
