import { FETCH_VIVA_PROPERTIES_SUCCEEDED } from './types';

export function fetchVivaPropertiesSucceeded(payload) {
  return {
    type: FETCH_VIVA_PROPERTIES_SUCCEEDED,
    payload,
  };
}

export default { fetchVivaPropertiesSucceeded };
