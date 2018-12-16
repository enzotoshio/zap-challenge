import React from 'react';
import { shallow } from 'enzyme';

import Button from '../';

describe('Button', () => {
  describe('when clicked', () => {
    it('should call the function passed to onClick', () => {
      const callbacks = {
        handleClick() {},
      };
      const handleClickSpy = jest.spyOn(callbacks, 'handleClick');
      const component = shallow(<Button onClick={callbacks.handleClick} />);

      component.simulate('click');

      expect(handleClickSpy).toHaveBeenCalled();

      handleClickSpy.mockRestore();
    });
  });
});
