import React from 'react';
import { shallow } from 'enzyme';

import { List } from '../';

describe('List', () => {
  it('renders the same amount of the list length', () => {
    const list = [{ id: 1 }, { id: 2 }];
    const component = shallow(
      <List items={list}>
        <span />
      </List>
    );

    expect(component.find('li').children()).toHaveLength(list.length);
  });

  describe('when an item is clicked', () => {
    it('redirects the application', () => {
      const list = [{ id: 1 }];
      const history = [];
      const historySpy = jest.spyOn(history, 'push');
      const component = shallow(
        <List items={list} history={history}>
          <span />
        </List>
      );

      component.find('li').simulate('click');

      expect(historySpy).toHaveBeenCalled();

      historySpy.mockRestore();
    });
  });
});
