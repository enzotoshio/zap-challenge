import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import './style.css';
import { getProperty } from '../../redux/properties/selectors';
import { propertyType as propertyTypeEnum } from '../../enum/property';
import { fetchProperty } from '../../redux/properties/actions';
import Button from '../../component/button';
import ThumbnailGallery from '../../component/thumbnail-gallery';

class PropertyList extends Component {
  componentDidMount() {
    this.props.boundFetchProperty(this.props.match.params.id);
  }
  render() {
    const {
      property: {
        pricingInfos,
        bathrooms,
        bedrooms,
        usableAreas,
        parkingSpaces,
        images,
      },
      history,
    } = this.props;

    return (
      <div className="app-container">
        <div className="property-details">
          <div className="details">
            <h2>
              Apartamento para{' '}
              {propertyTypeEnum[pricingInfos.businessType.toLowerCase()]}
            </h2>
            <p>Banheiros: {bathrooms}</p>
            <p>Quartos: {bedrooms}</p>
            <p>
              Área: {usableAreas}m<sup>2</sup>
            </p>
            <p>Vagas: {parkingSpaces}</p>
            <p>R${pricingInfos.price}</p>
          </div>
          <div className="gallery">
            <ThumbnailGallery images={images} />
          </div>
        </div>
        <Button onClick={() => history.goBack()} text="Voltar" />
      </div>
    );
  }
}

PropertyList.defaultProps = {
  property: {
    images: [],
    pricingInfos: {
      businessType: 'rental',
      price: '0',
    },
    bathrooms: 0,
    bedrooms: 0,
    usableAreas: 0,
    parkingSpaces: 0,
  },
};

PropertyList.propTypes = {
  property: PropTypes.shape({
    images: PropTypes.arrayOf(String),
    pricingInfos: PropTypes.shape({
      businessType: PropTypes.string,
      price: PropTypes.string,
    }),
    bathrooms: PropTypes.number,
    bedrooms: PropTypes.number,
    usableAreas: PropTypes.number,
    parkingSpaces: PropTypes.number,
  }),
};

const mapDispatchToProps = {
  boundFetchProperty: fetchProperty,
};

const mapStateToProps = (state, props) => ({
  property: getProperty(state, { id: props.match.params.id }),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PropertyList)
);
