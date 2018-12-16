import React from 'react';
import { shallow } from 'enzyme';

import ToggleButton from '../';

describe('ToggleButton', () => {
  describe('when clicked', () => {
    it('should call the function passed to onClick', () => {
      const callbacks = {
        handleClick() {},
      };
      const handleClickSpy = jest.spyOn(callbacks, 'handleClick');
      const component = shallow(
        <ToggleButton onClick={callbacks.handleClick} />
      );

      component.simulate('click');

      expect(handleClickSpy).toHaveBeenCalled();

      handleClickSpy.mockRestore();
    });
  });

  describe('when selected is true', () => {
    it('should add selected class to the component', () => {
      const callbacks = () => {};
      const component = shallow(
        <ToggleButton onClick={callbacks.handleClick} selected={true} />
      );

      expect(component.hasClass('selected')).toBeTruthy();
    });
  });
});
