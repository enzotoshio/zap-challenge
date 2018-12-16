import { byId, byIdInitialState, allIds, allIdsInitialState } from '../reducer';
import {
  fetchVivaPropertiesFailed,
  fetchVivaPropertiesSucceeded,
} from '../actions';

describe('viva reducer', () => {
  describe('byId', () => {
    describe('when no state is provided', () => {
      it('should return the initial state', () => {
        const state = undefined;
        const action = {};

        expect(byId(state, action)).toEqual(byIdInitialState);
      });
    });

    describe('when FETCH_VIVA_PROPERTIES_SUCCEEDED action is sent', () => {
      it('should return the composed state', () => {
        const state = { 1: { id: 1 } };
        const payload = { entities: { properties: { 2: { id: 2 } } } };
        const action = fetchVivaPropertiesSucceeded(payload);

        expect(byId(state, action)).toEqual({
          ...state,
          ...payload.entities.properties,
        });
      });
    });

    describe('when FETCH_VIVA_PROPERTIES_FAILED action is sent', () => {
      it('should return the current state', () => {
        const state = { 1: { id: 1 } };
        const action = fetchVivaPropertiesFailed();

        expect(byId(state, action)).toEqual(state);
      });
    });
  });

  describe('allIds', () => {
    describe('when no state is provided', () => {
      it('should return the initial state', () => {
        const state = undefined;
        const action = {};

        expect(allIds(state, action)).toEqual(allIdsInitialState);
      });
    });

    describe('when FETCH_VIVA_PROPERTIES_SUCCEEDED action is sent', () => {
      it('should return the state with the payload sent', () => {
        const state = [1];
        const payload = { result: [2] };
        const action = fetchVivaPropertiesSucceeded(payload);

        expect(allIds(state, action)).toEqual([...payload.result]);
      });
    });

    describe('when FETCH_VIVA_PROPERTIES_FAILED action is sent', () => {
      it('should return the current state', () => {
        const state = [1];
        const action = fetchVivaPropertiesFailed();

        expect(allIds(state, action)).toEqual(state);
      });
    });
  });
});
