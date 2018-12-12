import { normalize } from 'normalizr';
import { get } from '../../service/api/core';

import { GET_PROPERTIES_REQUESTED, GET_PROPERTIES_SUCCEEDED } from './types';
// import { arrayOfProperties } from '../schema';
import { groupByPublisher } from '../../service/properties';

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
    const propertiesGroupedByPublisher = groupByPublisher(properties);

    dispatch(getPropertiesSucceeded());
  };
}

export default {
  getPropertiesSucceeded,
  getProperties,
};
