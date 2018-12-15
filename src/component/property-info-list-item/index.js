import React from 'react';
import PropTypes from 'prop-types';
import { propertyType as propertyTypeEnum } from '../../enum/property';
import ThumbnailGallery from '../thumbnail-gallery';
import './style.css';

function PropertyInfoListItem({
  images,
  pricingInfos,
  bathrooms,
  bedrooms,
  usableAreas,
  parkingSpaces,
}) {
  return (
    <div className="product-info-list-item">
      <ThumbnailGallery images={images} />
      <div className="description">
        <p>
          Apartamento para{' '}
          {propertyTypeEnum[pricingInfos.businessType.toLowerCase()]}
        </p>
        <p>Banheiros: {bathrooms}</p>
        <p>Quartos: {bedrooms}</p>
        <p>
          Área: {usableAreas}m<sup>2</sup>
        </p>
        <p>Vagas: {parkingSpaces}</p>
        <p>R${pricingInfos.price}</p>
      </div>
    </div>
  );
}

PropertyInfoListItem.defaultProps = {
  images: [],
  pricingInfos: {
    businessType: 'rental',
    price: '0',
  },
  bathrooms: 0,
  bedrooms: 0,
  usableAreas: 0,
  parkingSpaces: 0,
};

PropertyInfoListItem.propTypes = {
  images: PropTypes.arrayOf(String),
  pricingInfos: PropTypes.shape({
    businessType: PropTypes.string,
    price: PropTypes.string,
  }),
  bathrooms: PropTypes.number,
  bedrooms: PropTypes.number,
  usableAreas: PropTypes.number,
  parkingSpaces: PropTypes.number,
};

export default PropertyInfoListItem;
