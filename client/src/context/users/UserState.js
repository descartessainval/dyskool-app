import React, { useState, useReducer } from 'react';
import axios from 'axios';
import UserContext from './UserContext';
import UserReducer from './UserReducer';

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

const config = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

const UserState = (props) => {
  const initialState = {
    users: [],
    loading: false,
    current: null,
    pageNumber: null,
    number: null,
    currentPage: 1,
    getsPerPage: 1, //nb objet par page
    error: null,
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  //get Users
  const getUsers = async () => {
    const res = await axios.get('http://localhost:5000/api/v2/users');
    // console.log(res, 'mes données');
    // console.log(res.data.users, 'côté userState');

    // console.log(res.data.users, 'ce que je veux dans mes données');
    dispatch({ type: GET_USERS, payload: res.data.users });
  };

  // Set current user
  const setCurrent = (user) => {
    dispatch({ type: SET_CURRENT, payload: user });
  };

  // //set current page FONCTIONNE PAS J AI PERd LA LOGIQUE des contexts
  const setCurrentPage = (pageNumber) => {
    dispatch({
      type: SET_CURRENT_PAGE,
      payload: pageNumber,
    });
  };

  //Clear current user
  const clearCurrent = (user) => {
    dispatch({ type: CLEAR_CURRENT, payload: user });
  };

  //add a user
  const addUser = async (user) => {
    try {
      const res = await axios.post(
        'http://localhost:5000/api/v2/users',
        user,
        config
      );
      dispatch({ type: ADD_USER, payload: res.data });
    } catch (err) {
      console.log(err.response.msg);
      dispatch({ type: USER_ERROR, payload: err.response.msg });
    }
  };

  //update a user
  const updateUser = async (user) => {
    const res = await axios.put(
      `http://localhost:5000/api/v2/users/${user._id}`,
      user,
      config
    );
    dispatch({ type: UPDATE_USER, payload: res.data });
  };

  //delete a user
  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/v2/users/${id}`);
      dispatch({ type: DELETE_USER, payload: id });
    } catch (err) {
      console.log(err.response.msg);
      dispatch({ type: USER_ERROR, payload: err.response.msg });
    }
    // const res = await axios.delete(
    //   'http://localhost:5000/api/v2/french',
    //   config
    // );
    // dispatch({ type: DELETE_french exercice, payload: id });
  };

  return (
    <UserContext.Provider
      value={{
        users: state.users,
        current: state.current,
        currentPage: state.currentPage,
        getsPerPage: state.getsPerPage,
        pageNumber: state.pageNumber,
        error: state.error,
        loading: state.loading,
        getUsers,
        addUser,
        deleteUser,
        setCurrent,
        setCurrentPage,
        clearCurrent,
        updateUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
