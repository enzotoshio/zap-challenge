import { GET_VIVA_PROPERTIES_SUCCEEDED } from './types';

export function getVivaPropertiesSucceeded(payload) {
  return {
    type: GET_VIVA_PROPERTIES_SUCCEEDED,
    payload,
  };
}

export default { getVivaPropertiesSucceeded };
