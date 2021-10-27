import React, { useReducer } from 'react';
import DefinitionContext from './DefinitionContext';
import DefinitionReducer from './DefinitionReducer';
import axios from 'axios';

import {
  GET_DEFINITIONS,
  ADD_DEFINITION,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_DEFINITION,
  DELETE_DEFINITION,
  DEFINITION_ERROR,
} from '../types';

const config = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

const DefinitionState = (props) => {
  const initialState = {
    definitions: [],
    loading: false,
    current: null,
    error: null,
  };

  const [state, dispatch] = useReducer(DefinitionReducer, initialState);

  //get definitions
  const getDefinitions = async () => {
    const res = await axios.get('http://localhost:5000/api/v2/definitions');
    //console.log(res, 'mes données');
    console.log(res.data.definitions, 'ce que je veux dans mes données');
    dispatch({ type: GET_DEFINITIONS, payload: res.data.definitions });
  };

  // Set current definition
  const setCurrent = (definition) => {
    dispatch({ type: SET_CURRENT, payload: definition });
  };

  //Clear current definition
  const clearCurrent = (definition) => {
    dispatch({ type: CLEAR_CURRENT, payload: definition });
  };

  //add a definition
  const addDefinition = async (definition) => {
    try {
      const res = await axios.post(
        'http://localhost:5000/api/v2/definitions',
        definition,
        config
      );
      dispatch({ type: ADD_DEFINITION, payload: res.data });
    } catch (err) {
      console.log(err.response.msg);
      dispatch({ type: DEFINITION_ERROR, payload: err.response.msg });
    }
  };

  //update a definition
  const updateDefinition = async (definition) => {
    const res = await axios.put(
      `http://localhost:5000/api/v2/definitions/${definition._id}`,
      definition,
      config
    );
    dispatch({ type: UPDATE_DEFINITION, payload: res.data });
  };

  //delete a definition
  const deleteDefinition = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/v2/definitions/${id}`);
      dispatch({ type: DELETE_DEFINITION, payload: id });
    } catch (err) {
      console.log(err.response.msg);
      dispatch({ type: DEFINITION_ERROR, payload: err.response.msg });
    }
    // const res = await axios.delete(
    //   'http://localhost:5000/api/v2/definitions',
    //   config
    // );
    // dispatch({ type: DELETE_DEFINITION, payload: id });
  };

  return (
    <DefinitionContext.Provider
      value={{
        definitions: state.definitions,
        current: state.current,
        error: state.error,
        getDefinitions,
        addDefinition,
        deleteDefinition,
        setCurrent,
        clearCurrent,
        updateDefinition,
      }}
    >
      {props.children}
    </DefinitionContext.Provider>
  );
};

export default DefinitionState;
