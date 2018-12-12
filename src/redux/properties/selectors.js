export const getVivaPropertiesSelector = state =>
  state.properties.viva.allIds.map(id => state.loans.byId[id]);

export default { getVivaPropertiesSelector };
