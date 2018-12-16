import {
  getAvailableZapPropertiesIds,
  getAllZapPropertiesRegisters,
  getZapProperties,
  getZapProperty,
  getPaginatedZapProperties,
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

describe('zap selectors', () => {
  describe('getAvailableZapPropertiesIds', () => {
    it('should return all the zap properties ids', () => {
      const state = {
        properties: { zap: { allIds: [1, 2] } },
      };

      const propertiesIds = getAvailableZapPropertiesIds(state);

      expect(propertiesIds).toEqual(state.properties.zap.allIds);
    });
  });

  describe('getAllZapPropertiesRegisters', () => {
    it('should return the zap properties registers', () => {
      const state = {
        properties: { zap: { byId: { 1: { id: 1 } } } },
      };

      const propertiesRegisters = getAllZapPropertiesRegisters(state);

      expect(propertiesRegisters).toEqual(state.properties.zap.byId);
    });
  });

  describe('getZapProperties', () => {
    it('should return the zap properties registers available', () => {
      const state = {
        properties: {
          zap: {
            byId: {
              1: { id: 1 },
              2: { id: 2 },
            },
            allIds: [1],
          },
        },
      };

      const availablePropertiesRegisters = getZapProperties(state);

      expect(availablePropertiesRegisters).toEqual([{ id: 1 }]);
    });
  });

  describe('getZapProperty', () => {
    it('should return the zap property requested', () => {
      const state = {
        properties: {
          zap: {
            byId: {
              1: { id: 1 },
              2: { id: 2 },
            },
          },
        },
      };

      const property = getZapProperty(state, { id: 1 });

      expect(property).toEqual({ id: 1 });
    });
  });

  describe('getPaginatedZapProperties', () => {
    it('should return two pages of properties', () => {
      const state = {
        properties: {
          zap: {
            byId: { ...propertiesByIdFactory(21) },
            allIds: [...propertiesAllIdsFactory(21)],
          },
        },
      };

      const paginatedProperties = getPaginatedZapProperties(state);

      expect(paginatedProperties.length).toBe(2);
    });
  });
});
