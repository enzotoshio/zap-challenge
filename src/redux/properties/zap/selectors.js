export const getZapPropertiesSelector = state =>
  state.properties.zap.allIds.map(id => state.properties.zap.byId[id]);

export default { getZapPropertiesSelector };
