import React from 'react';
import renderer from 'react-test-renderer';

import PropertyInfoListItem from '../';

describe('PropertyInfoListItem', () => {
  it('increments the current page', () => {
    const item = {
      images: ['pumba'],
      pricingInfos: {
        businessType: 'sale',
        price: '10',
      },
      bathrooms: 10,
      bedrooms: 10,
      usableAreas: 10,
      parkingSpaces: 10,
    };
    const component = renderer.create(
      <PropertyInfoListItem {...item}>
        <span />
      </PropertyInfoListItem>
    );

    const dom = component.toJSON();

    expect(dom).toMatchSnapshot();
  });
});
