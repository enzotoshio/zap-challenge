import { combineReducers } from 'redux';
import viva from './viva/reducer';

import {
  GET_PROPERTIES_SUCCEEDED,
  GET_PROPERTIES_REQUESTED,
  GET_PROPERTIES_FAILED,
} from './types';

export const isLoadingInitialState = false;

export function isLoading(state = isLoadingInitialState, action) {
  switch (action.type) {
    case GET_PROPERTIES_REQUESTED:
      return true;
    case GET_PROPERTIES_SUCCEEDED:
    case GET_PROPERTIES_FAILED:
      return isLoadingInitialState;
    default:
      return state;
  }
}

export const errorMessageInitialState = null;

export function errorMessage(state = errorMessageInitialState, action) {
  switch (action.type) {
    case GET_PROPERTIES_REQUESTED:
    case GET_PROPERTIES_SUCCEEDED:
      return errorMessageInitialState;
    case GET_PROPERTIES_FAILED:
      return action.payload.message;
    default:
      return state;
  }
}

export default combineReducers({ viva, isLoading, errorMessage });
