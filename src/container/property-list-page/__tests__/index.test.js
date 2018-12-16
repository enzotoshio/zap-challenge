import React from 'react';
import { shallow } from 'enzyme';
import { PropertyListPage } from '../';

describe('PropertyListPage', () => {
  describe('when zap toggle button is clicked', () => {
    it('sets the zap list state to true ', () => {
      const component = shallow(
        <PropertyListPage boundFetchProperties={() => {}} />
      );

      component.find('.zap-toggle-button').simulate('click');

      expect(component.state('lists')).toEqual({ viva: false, zap: true });
    });
  });

  describe('when viva toggle button is clicked', () => {
    it('sets the viva list state to true ', () => {
      const component = shallow(
        <PropertyListPage boundFetchProperties={() => {}} />
      );
      component.setState({
        lists: {
          viva: false,
          zap: true,
        },
      });

      component.find('.viva-toggle-button').simulate('click');

      expect(component.state('lists')).toEqual({ viva: true, zap: false });
    });
  });
});
