import {
  getAvailableVivaPropertiesIds,
  getAllVivaPropertiesRegisters,
  getVivaProperties,
  getVivaProperty,
  getPaginatedVivaProperties,
} from '../selectors';

function propertiesByIdFactory(quantity) {
  const properties = [];

  for (let i = 1; i <= quantity; i++) {
    properties.push({ [i]: { id: i } });
  }

  return properties;
}

function propertiesAllIdsFactory(quantity) {
  const propertiesIds = [];

  for (let i = 1; i <= quantity; i++) {
    propertiesIds.push(i);
  }

  return propertiesIds;
}

describe('viva selectors', () => {
  describe('getAvailableVivaPropertiesIds', () => {
    it('should return all the viva properties ids', () => {
      const state = {
        properties: { viva: { allIds: [1, 2] } },
      };

      const propertiesIds = getAvailableVivaPropertiesIds(state);

      expect(propertiesIds).toEqual(state.properties.viva.allIds);
    });
  });

  describe('getAllVivaPropertiesRegisters', () => {
    it('should return the viva properties registers', () => {
      const state = {
        properties: { viva: { byId: { 1: { id: 1 } } } },
      };

      const propertiesRegisters = getAllVivaPropertiesRegisters(state);

      expect(propertiesRegisters).toEqual(state.properties.viva.byId);
    });
  });

  describe('getVivaProperties', () => {
    it('should return the viva properties registers available', () => {
      const state = {
        properties: {
          viva: {
            byId: {
              1: { id: 1 },
              2: { id: 2 },
            },
            allIds: [1],
          },
        },
      };

      const availablePropertiesRegisters = getVivaProperties(state);

      expect(availablePropertiesRegisters).toEqual([{ id: 1 }]);
    });
  });

  describe('getVivaProperty', () => {
    it('should return the viva property requested', () => {
      const state = {
        properties: {
          viva: {
            byId: {
              1: { id: 1 },
              2: { id: 2 },
            },
          },
        },
      };

      const property = getVivaProperty(state, { id: 1 });

      expect(property).toEqual({ id: 1 });
    });
  });

  describe('getPaginatedVivaProperties', () => {
    it('should return two pages of properties', () => {
      const state = {
        properties: {
          viva: {
            byId: { ...propertiesByIdFactory(21) },
            allIds: [...propertiesAllIdsFactory(21)],
          },
        },
      };

      const paginatedProperties = getPaginatedVivaProperties(state);

      expect(paginatedProperties.length).toBe(2);
    });
  });
});
