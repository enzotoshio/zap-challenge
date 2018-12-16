import { normalize } from 'normalizr';
import { get } from '../../service/api/core';

import {
  FETCH_PROPERTIES_REQUESTED,
  FETCH_PROPERTIES_SUCCEEDED,
  FETCH_PROPERTIES_FAILED,
} from './types';
import { arrayOfProperties } from './schema';
import { groupByPublisher } from '../../service/properties';
import {
  fetchVivaPropertiesSucceeded,
  fetchVivaPropertiesFailed,
} from './viva/actions';
import {
  fetchZapPropertiesSucceeded,
  fetchZapPropertiesFailed,
} from './zap/actions';
import { getProperty } from './selectors';

export function fetchPropertiesSucceeded() {
  return {
    type: FETCH_PROPERTIES_SUCCEEDED,
  };
}

export function fetchPropertiesRequested() {
  return {
    type: FETCH_PROPERTIES_REQUESTED,
  };
}

export function fetchPropertiesFailed({ message }) {
  return {
    type: FETCH_PROPERTIES_FAILED,
    payload: { message },
  };
}

export function fetchProperties() {
  return async function(dispatch) {
    dispatch(fetchPropertiesRequested());

    try {
      const properties = await get(
        'http://grupozap-code-challenge.s3-website-us-east-1.amazonaws.com/sources/source-1.json'
      );
      const { viva: vivaProperties, zap: zapProperties } = groupByPublisher(
        properties
      );
      const normalizedVivaPayload = normalize(
        vivaProperties,
        arrayOfProperties
      );
      const normalizedZapPayload = normalize(zapProperties, arrayOfProperties);

      dispatch(fetchVivaPropertiesSucceeded(normalizedVivaPayload));
      dispatch(fetchZapPropertiesSucceeded(normalizedZapPayload));
      dispatch(fetchPropertiesSucceeded());
    } catch (error) {
      dispatch(fetchVivaPropertiesFailed());
      dispatch(fetchZapPropertiesFailed());
      dispatch(
        fetchPropertiesFailed({ message: 'Erro ao buscar propriedades.' })
      );
    }
  };
}

export function fetchProperty(id) {
  return async function(dispatch, getState) {
    const store = getState();
    const property = getProperty(store, { id });

    if (!property) {
      dispatch(fetchProperties());
    }
  };
}

export default {
  fetchPropertiesSucceeded,
  fetchPropertiesRequested,
  fetchPropertiesFailed,
  fetchProperties,
  fetchProperty,
};
