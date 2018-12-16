import React from 'react';
import { shallow, mount } from 'enzyme';

import TumbnailGallery from '../';

describe('TumbnailGallery', () => {
  describe('when clicking in the thumbnail-right-arrow', () => {
    describe('when currentImage is lower than the images list length', () => {
      it('increments the current page', () => {
        const images = [{ id: 1 }, { id: 2 }];
        const component = mount(
          <TumbnailGallery images={images}>
            <span />
          </TumbnailGallery>
        );

        component
          .find('.thumbnail-right-arrow')
          .simulate('click', { stopPropagation() {} });

        expect(component.state('currentImage')).toEqual(1);
      });
    });

    describe('when currentImage is equal or higher than the images list length', () => {
      it('doesnt increment the current page', () => {
        const images = [{ id: 1 }, { id: 2 }];
        const component = shallow(
          <TumbnailGallery images={images}>
            <span />
          </TumbnailGallery>
        );
        component.setState({ currentImage: 1 });

        component
          .find('.thumbnail-right-arrow')
          .simulate('click', new Event(0));

        expect(component.state('currentImage')).toEqual(1);
      });
    });
  });

  describe('when clicking in the thumbnail-left-arrow-container', () => {
    describe('when currentImage is higher than 0', () => {
      it('decreases the current page', () => {
        const images = [{ id: 1 }, { id: 2 }];
        const component = shallow(
          <TumbnailGallery images={images}>
            <span />
          </TumbnailGallery>
        );
        component.setState({ currentImage: 1 });

        component
          .find('.thumbnail-left-arrow-container')
          .simulate('click', new Event(0));

        expect(component.state('currentImage')).toEqual(0);
      });
    });

    describe('when currentImage is equal or lower than 0', () => {
      it('doesnt decrease the current page', () => {
        const images = [{ id: 1 }, { id: 2 }];
        const component = shallow(
          <TumbnailGallery images={images}>
            <span />
          </TumbnailGallery>
        );
        component.setState({ currentImage: 0 });

        component
          .find('.thumbnail-left-arrow-container')
          .simulate('click', new Event(0));

        expect(component.state('currentImage')).toEqual(0);
      });
    });
  });
});
