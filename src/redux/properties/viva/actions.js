import {
  FETCH_VIVA_PROPERTIES_SUCCEEDED,
  FETCH_VIVA_PROPERTIES_FAILED,
} from './types';

export function fetchVivaPropertiesSucceeded(payload) {
  return {
    type: FETCH_VIVA_PROPERTIES_SUCCEEDED,
    payload,
  };
}

export function fetchVivaPropertiesFailed(payload) {
  return {
    type: FETCH_VIVA_PROPERTIES_FAILED,
    payload,
  };
}

export default { fetchVivaPropertiesSucceeded };
