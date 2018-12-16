import { combineReducers } from 'redux';
import viva from './viva/reducer';
import zap from './zap/reducer';

import {
  FETCH_PROPERTIES_SUCCEEDED,
  FETCH_PROPERTIES_REQUESTED,
  FETCH_PROPERTIES_FAILED,
} from './types';

export const isLoadingInitialState = false;

export function isLoading(state = isLoadingInitialState, action) {
  switch (action.type) {
    case FETCH_PROPERTIES_REQUESTED:
      return true;
    case FETCH_PROPERTIES_SUCCEEDED:
    case FETCH_PROPERTIES_FAILED:
      return false;
    default:
      return state;
  }
}

export const errorMessageInitialState = null;

export function errorMessage(state = errorMessageInitialState, action) {
  switch (action.type) {
    case FETCH_PROPERTIES_REQUESTED:
    case FETCH_PROPERTIES_SUCCEEDED:
      return null;
    case FETCH_PROPERTIES_FAILED:
      return action.payload.message;
    default:
      return state;
  }
}

export default combineReducers({ viva, zap, isLoading, errorMessage });
