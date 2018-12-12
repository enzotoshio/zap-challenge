import { GET_ZAP_PROPERTIES_SUCCEEDED } from './types';

export function getZapPropertiesSucceeded(payload) {
  return { type: GET_ZAP_PROPERTIES_SUCCEEDED, payload };
}

export default { getZapPropertiesSucceeded };
