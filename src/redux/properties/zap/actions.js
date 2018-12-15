import { FETCH_ZAP_PROPERTIES_SUCCEEDED } from './types';

export function fetchZapPropertiesSucceeded(payload) {
  return { type: FETCH_ZAP_PROPERTIES_SUCCEEDED, payload };
}

export default { fetchZapPropertiesSucceeded };
