import { normalize } from 'normalizr';
import { get } from '../../service/api/core';

import { GET_PROPERTIES_REQUESTED, GET_PROPERTIES_SUCCEEDED } from './types';
import { arrayOfProperties } from './schema';
import { groupByPublisher } from '../../service/properties';
import { getVivaPropertiesSucceeded } from './viva/actions';
import { getZapPropertiesSucceeded } from './zap/actions';

export function getPropertiesSucceeded() {
  return {
    type: GET_PROPERTIES_SUCCEEDED,
  };
}

export function getPropertiesLoading() {
  return {
    type: GET_PROPERTIES_REQUESTED,
  };
}

export function getProperties() {
  return async function(dispatch) {
    dispatch(getPropertiesLoading());

    const properties = await get(
      'http://grupozap-code-challenge.s3-website-us-east-1.amazonaws.com/sources/source-1.json'
    );
    const { viva: vivaProperties, zap: zapProperties } = groupByPublisher(
      properties
    );
    const normalizedVivaPayload = normalize(vivaProperties, arrayOfProperties);
    const normalizedZapPayload = normalize(zapProperties, arrayOfProperties);

    dispatch(getVivaPropertiesSucceeded(normalizedVivaPayload));
    dispatch(getZapPropertiesSucceeded(normalizedZapPayload));
    dispatch(getPropertiesSucceeded());
  };
}

export default {
  getPropertiesSucceeded,
  getProperties,
};
