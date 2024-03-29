import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { fetchProperties } from '../../redux/properties/actions';
import { getPaginatedVivaProperties } from '../../redux/properties/viva/selectors';
import { getPaginatedZapProperties } from '../../redux/properties/zap/selectors';
import PaginatedList from '../../component/paginated-list';
import './style.css';
import ToggleButton from '../../component/toggle-button';
import PropertyInfoListItem from '../../component/property-info-list-item';

export class PropertyListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lists: {
        viva: true,
        zap: false,
      },
    };
  }

  componentDidMount() {
    this.props.boundFetchProperties();
  }

  selectList(listName) {
    const { lists } = this.state;
    const unselectedLists = _.mapValues(lists, list => false);

    this.setState({
      lists: {
        ...unselectedLists,
        [listName]: true,
      },
    });
  }

  render() {
    const {
      lists: { viva: isVivaSelected, zap: isZapSelected },
    } = this.state;
    const { vivaProperties, zapProperties } = this.props;

    return (
      <div className="app-container">
        <ul className="menu">
          <ToggleButton
            className="menu-button viva-toggle-button"
            selected={isVivaSelected}
            onClick={() => this.selectList('viva')}
            text="Viva"
          />
          <ToggleButton
            className="menu-button zap-toggle-button"
            selected={isZapSelected}
            onClick={() => this.selectList('zap')}
            text="Zap"
          />
        </ul>
        <div className="property-list">
          {isVivaSelected && (
            <PaginatedList list={vivaProperties}>
              <PropertyInfoListItem />
            </PaginatedList>
          )}
          {isZapSelected && (
            <PaginatedList list={zapProperties}>
              <PropertyInfoListItem />
            </PaginatedList>
          )}
        </div>
      </div>
    );
  }
}

PropertyListPage.defaultProps = {
  vivaProperties: [],
  zapProperties: [],
};

PropertyListPage.propTypes = {
  boundFetchProperties: PropTypes.func.isRequired,
  vivaProperties: PropTypes.arrayOf(Object),
  zapProperties: PropTypes.arrayOf(Object),
};

const mapDispatchToProps = {
  boundFetchProperties: fetchProperties,
};

const mapStateToProps = state => ({
  vivaProperties: getPaginatedVivaProperties(state),
  zapProperties: getPaginatedZapProperties(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PropertyListPage);
