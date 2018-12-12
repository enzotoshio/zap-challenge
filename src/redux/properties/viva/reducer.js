import { combineReducers } from 'redux';

import {
  GET_VIVA_PROPERTIES_SUCCEEDED,
  GET_VIVA_PROPERTIES_FAILED,
} from './types';

export const byIdInitialState = {};

export function byId(state = byIdInitialState, action) {
  switch (action.type) {
    case GET_VIVA_PROPERTIES_FAILED:
      return state;
    case GET_VIVA_PROPERTIES_SUCCEEDED: {
      const { properties } = action.payload.entities;

      return { ...state, ...properties };
    }
    default:
      return state;
  }
}

export const allIdsInitialState = [];

export function allIds(state = allIdsInitialState, action) {
  switch (action.type) {
    case GET_VIVA_PROPERTIES_FAILED:
      return state;
    case GET_VIVA_PROPERTIES_SUCCEEDED: {
      const ids = action.payload.result;

      return [...ids];
    }
    default:
      return state;
  }
}

export default combineReducers({ byId, allIds });
