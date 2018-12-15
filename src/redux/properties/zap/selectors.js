import { createSelector } from 'reselect';
import { chunk } from 'lodash';

export const getAvailableZapPropertiesIds = ({ properties }) =>
  properties.zap.allIds;
export const getAllZapPropertiesRegisters = ({ properties }) =>
  properties.zap.byId;
export const getZapProperty = ({ properties }, { id }) =>
  properties.zap.byId[id];

export const getZapProperties = createSelector(
  getAvailableZapPropertiesIds,
  getAllZapPropertiesRegisters,
  (ids, properties) => ids.map(id => properties[id])
);

export const getPaginatedZapProperties = createSelector(
  getZapProperties,
  properties => chunk(properties, 20)
);

export default {
  getZapProperties,
  getZapProperty,
  getPaginatedZapProperties,
  getAvailableZapPropertiesIds,
  getAllZapPropertiesRegisters,
};
