import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { propertyType as propertyTypeEnum } from '../../enum/property';

function List({ items }) {
  const listItems = items.map(item => (
    <li className="list-item" key={item.id}>
      <div className="thumbnail">
        <img src={item.images[0]} alt="Fotos do imóvel" />
      </div>

      <p>
        Apartamento para{' '}
        {propertyTypeEnum[item.pricingInfos.businessType.toLowerCase()]}
      </p>
      <ul>
        <li>Banheiros: {item.bathrooms}</li>
        <li>Quartos: {item.bedrooms}</li>
        <li>
          Área: {item.usableAreas}m<sup>2</sup>
        </li>
        <li>Vagas: {item.parkingSpaces}</li>
      </ul>
      <p>R${item.pricingInfos.price}</p>
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

export default List;
