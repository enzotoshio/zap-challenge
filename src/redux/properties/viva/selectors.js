export const getVivaPropertiesSelector = state =>
  state.properties.viva.allIds.map(id => state.properties.viva.byId[id]);

export default { getVivaPropertiesSelector };
