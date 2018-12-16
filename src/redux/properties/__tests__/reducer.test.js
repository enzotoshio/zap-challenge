import {
  isLoadingInitialState,
  errorMessageInitialState,
  isLoading,
  errorMessage,
} from '../reducer';
import {
  fetchPropertiesSucceeded,
  fetchPropertiesFailed,
  fetchPropertiesRequested,
} from '../actions';

describe('properties reducer', () => {
  describe('isLoading', () => {
    describe('when no state is provided', () => {
      it('should return the initial state', () => {
        const state = undefined;
        const action = {};

        expect(isLoading(state, action)).toEqual(isLoadingInitialState);
      });
    });

    describe('when FETCH_PROPERTIES_SUCCEEDED action is sent', () => {
      it('should return false', () => {
        const action = fetchPropertiesSucceeded();

        expect(isLoading(undefined, action)).toBeFalsy();
      });
    });

    describe('when FETCH_PROPERTIES_FAILED action is sent', () => {
      it('should return false', () => {
        const action = fetchPropertiesFailed({});

        expect(isLoading(undefined, action)).toBeFalsy();
      });
    });

    describe('when FETCH_PROPERTIES_FAILED action is sent', () => {
      it('should return true', () => {
        const action = fetchPropertiesRequested();

        expect(isLoading(undefined, action)).toBeTruthy();
      });
    });
  });

  describe('errorMessage', () => {
    describe('when no state is provided', () => {
      it('should return the initial state', () => {
        const action = {};

        expect(errorMessage(undefined, action)).toBe(errorMessageInitialState);
      });
    });

    describe('when FETCH_PROPERTIES_SUCCEEDED action is sent', () => {
      it('should return the state with the payload sent', () => {
        const action = fetchPropertiesSucceeded();

        expect(errorMessage(undefined, action)).toBe(null);
      });
    });

    describe('when FETCH_PROPERTIES_REQUESTED action is sent', () => {
      it('should return the state with the payload sent', () => {
        const action = fetchPropertiesRequested();

        expect(errorMessage(undefined, action)).toBe(null);
      });
    });

    describe('when FETCH_PROPERTIES_FAILED action is sent', () => {
      it('should return the current state', () => {
        const message = 'Mufasa';
        const action = fetchPropertiesFailed({ message });

        expect(errorMessage(undefined, action)).toEqual(message);
      });
    });
  });
});
