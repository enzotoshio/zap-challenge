import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import './style.css';
import { propertyType as propertyTypeEnum } from '../../enum/property';
import ThumbnailGallery from '../thumbnail-gallery';

function List({ items, history }) {
  const listItems = items.map(item => (
    <li
      className="list-item"
      key={item.id}
      onClick={() => history.push(`/property/${item.id}`)}
    >
      <ThumbnailGallery images={item.images} />
      <div className="list-item-description">
        <p>
          Apartamento para{' '}
          {propertyTypeEnum[item.pricingInfos.businessType.toLowerCase()]}
        </p>
        <p>Banheiros: {item.bathrooms}</p>
        <p>Quartos: {item.bedrooms}</p>
        <p>
          Área: {item.usableAreas}m<sup>2</sup>
        </p>
        <p>Vagas: {item.parkingSpaces}</p>
        <p>R${item.pricingInfos.price}</p>
      </div>
    </li>
  ));

  return <ul className="list">{listItems}</ul>;
}

List.defaultProps = {
  items: [],
};

List.propTypes = {
  items: PropTypes.arrayOf(Object),
};

export default withRouter(List);
