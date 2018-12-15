import { normalize } from 'normalizr';
import { get } from '../../service/api/core';

import { GET_PROPERTIES_REQUESTED, GET_PROPERTIES_SUCCEEDED } from './types';
import { arrayOfProperties } from './schema';
import { groupByPublisher } from '../../service/properties';
import { fetchVivaPropertiesSucceeded } from './viva/actions';
import { fetchZapPropertiesSucceeded } from './zap/actions';

export function fetchPropertiesSucceeded() {
  return {
    type: GET_PROPERTIES_SUCCEEDED,
  };
}

export function fetchPropertiesLoading() {
  return {
    type: GET_PROPERTIES_REQUESTED,
  };
}

export function fetchProperties() {
  return async function(dispatch) {
    dispatch(fetchPropertiesLoading());

    const properties = await get(
      'http://grupozap-code-challenge.s3-website-us-east-1.amazonaws.com/sources/source-1.json'
    );
    const { viva: vivaProperties, zap: zapProperties } = groupByPublisher(
      properties
    );
    const normalizedVivaPayload = normalize(vivaProperties, arrayOfProperties);
    const normalizedZapPayload = normalize(zapProperties, arrayOfProperties);

    dispatch(fetchVivaPropertiesSucceeded(normalizedVivaPayload));
    dispatch(fetchZapPropertiesSucceeded(normalizedZapPayload));
    dispatch(fetchPropertiesSucceeded());
  };
}

export function fetchProperty() {
  return async function(dispatch, getState) {};
}

export default {
  fetchPropertiesSucceeded,
  fetchPropertiesLoading,
  fetchProperties,
};
