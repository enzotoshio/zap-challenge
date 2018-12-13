import { createSelector } from 'reselect';
import { chunk } from 'lodash';

export const getAvailableVivaPropertiesIds = ({ properties }) =>
  properties.viva.allIds;
export const getAllVivaPropertiesRegisters = ({ properties }) =>
  properties.viva.byId;

export const getVivaProperties = createSelector(
  getAvailableVivaPropertiesIds,
  getAllVivaPropertiesRegisters,
  (ids, properties) => ids.map(id => properties[id])
);

export const getPaginatedVivaProperties = createSelector(
  getVivaProperties,
  properties => chunk(properties, 20)
);

export default {
  getVivaProperties,
  getPaginatedVivaProperties,
  getAvailableVivaPropertiesIds,
  getAllVivaPropertiesRegisters,
};
