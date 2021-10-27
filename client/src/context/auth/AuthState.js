import React, { useReducer } from 'react';
import setAuthToken from '../../helpers/setAuthToken';
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
import axios from 'axios';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';

const config = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthentificated: null,
    loading: true,
    error: null,
    user: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);
  // ici, l'ensemble des actions
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  // load User => qui check user est connecté
  const loadUser = async () => {
    //@todo - Load token into global headers
    // check local global storage
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      // console.log(localStorage.token);
    }
    try {
      const res = await axios.get('http://localhost:5000/api/v2/auth/logger');
      dispatch({ type: USER_LOADED, payload: res.data.user });

      //A EFFACER
      console.log(res.data.user);
    } catch (err) {
      dispatch({ type: AUTH_ERROR, payload: err.response.data.msg });
      console.log(err);
    }
  };

  //register User, qui donnera  le token en retour pas de token eon register
  const register = async (dataUser) => {
    try {
      const res = await axios.post(
        'http://localhost:5000/api/v2/auth/register',
        dataUser,
        config
      );
      //A EFFACER
      console.log(res);
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    } catch (err) {
      // const error = err.response.data.errors.map((error) => error.msg);
      // console.log(error.toString());
      dispatch({ type: REGISTER_FAIL, payload: err.response.data.msg });
    }
  };

  //login users
  const login = async (dataUser) => {
    try {
      const res = await axios.post(
        'http://localhost:5000/api/v2/auth/login',
        dataUser,
        config
      );
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      // loadUser();
    } catch (err) {
      // const error = err.response.data.errors.map((error) => error.msg);
      dispatch({ type: LOGIN_FAIL, payload: err.response.data.msg });
    }
  };

  //logout => qui étruire le token
  const logout = () => {
    dispatch({ type: LOGOUT });
  };

  //clear Errors => qui clears auth any errors
  const clearErrors = () => {
    dispatch({
      type: CLEAR_ERRORS,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthentificated: state.isAuthentificated,
        loading: state.loading,
        error: state.error,
        user: state.user,
        register,
        login,
        loadUser,
        logout,
        clearErrors,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
