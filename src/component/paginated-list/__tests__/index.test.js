import React from 'react';
import { shallow } from 'enzyme';

import PaginatedList from '../';

describe('PaginatedList', () => {
  describe('when clicking in the right-button', () => {
    describe('when currentPage is lower than the list length', () => {
      it('increments the current page', () => {
        const list = [{ id: 1 }, { id: 2 }];
        const component = shallow(
          <PaginatedList list={list}>
            <span />
          </PaginatedList>
        );

        component.find('.right-button').simulate('click');

        expect(component.state('currentPage')).toEqual(1);
      });
    });

    describe('when currentPage is equal or higher than the list length', () => {
      it('doesnt increment the current page', () => {
        const list = [{ id: 1 }, { id: 2 }];
        const component = shallow(
          <PaginatedList list={list}>
            <span />
          </PaginatedList>
        );
        component.setState({ currentPage: 1 });

        component.find('.right-button').simulate('click');

        expect(component.state('currentPage')).toEqual(1);
      });
    });
  });

  describe('when clicking in the left-button', () => {
    describe('when currentPage is higher than 0', () => {
      it('decreases the current page', () => {
        const list = [{ id: 1 }, { id: 2 }];
        const component = shallow(
          <PaginatedList list={list}>
            <span />
          </PaginatedList>
        );
        component.setState({ currentPage: 1 });

        component.find('.left-button').simulate('click');

        expect(component.state('currentPage')).toEqual(0);
      });
    });

    describe('when currentPage is equal or lower than 0', () => {
      it('doesnt decrease the current page', () => {
        const list = [{ id: 1 }, { id: 2 }];
        const component = shallow(
          <PaginatedList list={list}>
            <span />
          </PaginatedList>
        );
        component.setState({ currentPage: 0 });

        component.find('.left-button').simulate('click');

        expect(component.state('currentPage')).toEqual(0);
      });
    });
  });
});
