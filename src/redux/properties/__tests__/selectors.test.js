import { getProperty } from '../selectors';

describe('properties selectors', () => {
  describe('getProperty', () => {
    describe('when the property exists inside zap', () => {
      it('returns a property', () => {
        const state = {
          properties: { zap: { byId: { 1: { id: 1 } } }, viva: { byId: {} } },
        };

        const property = getProperty(state, { id: 1 });

        expect(property).toEqual(state.properties.zap.byId[1]);
      });
    });
  });

  describe('when the property exists inside viva', () => {
    it('returns a property', () => {
      const state = {
        properties: { viva: { byId: { 1: { id: 1 } } }, zap: { byId: {} } },
      };

      const property = getProperty(state, { id: 1 });

      expect(property).toEqual(state.properties.viva.byId[1]);
    });
  });

  describe('when the property doesnt exist inside any publisher', () => {
    it('returns a undefined', () => {
      const state = {
        properties: { viva: { byId: {} }, zap: { byId: {} } },
      };

      const property = getProperty(state, { id: 1 });

      expect(property).toBeUndefined();
    });
  });
});
