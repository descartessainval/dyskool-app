import React, { useReducer } from 'react';

import AlertContext from './AlertContext';
import AlertReducer from './AlertReducer';
import { v4 as uuid } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from '../types';

//initial state
const AlertState = (props) => {
  const initialState = [];

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  // ici, l'ensemble des actions

  // set_Alert
  const setAlert = (msg, type, timeout = 3000) => {
    const id = uuid();
    dispatch({ type: SET_ALERT, payload: { msg, type, id } });

    //ne fonctionne pas
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout); //fonctionne pas
  };

  return (
    <AlertContext.Provider
      value={{
        //toutes les actions seront définis seront ajoutées dans le provider
        alerts: state,
        setAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
