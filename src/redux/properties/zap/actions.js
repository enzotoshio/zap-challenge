import {
  FETCH_ZAP_PROPERTIES_SUCCEEDED,
  FETCH_ZAP_PROPERTIES_FAILED,
} from './types';

export function fetchZapPropertiesSucceeded(payload) {
  return { type: FETCH_ZAP_PROPERTIES_SUCCEEDED, payload };
}

export function fetchZapPropertiesFailed(payload) {
  return {
    type: FETCH_ZAP_PROPERTIES_FAILED,
    payload,
  };
}

export default { fetchZapPropertiesSucceeded };
