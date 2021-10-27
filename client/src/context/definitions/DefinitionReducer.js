import {
  GET_DEFINITIONS,
  ADD_DEFINITION,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_DEFINITION,
  DELETE_DEFINITION,
  DEFINITION_ERROR,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_DEFINITIONS:
      return {
        ...state,
        data: true,
        definitions: action.payload,
      };
    case ADD_DEFINITION:
      return {
        ...state,
        definitions: [...state.definitions, action.payload],
      };
    case SET_CURRENT:
      return {
        ...state, // current state
        current: action.payload,
      };

    case CLEAR_CURRENT:
      return {
        ...state, // current state
        current: null,
      };
    case UPDATE_DEFINITION:
      return {
        ...state, // current state
        definitions: state.definitions.map((definition) =>
          definition._id === action.payload._id ? action.payload : definition
        ),
      };
    case DELETE_DEFINITION:
      return {
        ...state, // current state
        definitions: state.definitions.filter(
          (definition) => definition._id !== action.payload
        ),
      };
    case DEFINITION_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
