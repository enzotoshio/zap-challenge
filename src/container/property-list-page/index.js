import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { getProperties } from '../../redux/properties/actions';
import { getPaginatedVivaProperties } from '../../redux/properties/viva/selectors';
import { getPaginatedZapProperties } from '../../redux/properties/zap/selectors';
import PaginatedList from '../../component/paginated-list';
import './style.css';
import ToggleButton from '../../component/toggle-button';

class PropertyList extends Component {
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
    this.props.boundGetProperties();
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
            selected={isVivaSelected}
            onClick={() => this.selectList('viva')}
            text="Viva"
          />
          <ToggleButton
            selected={isZapSelected}
            onClick={() => this.selectList('zap')}
            text="Zap"
          />
        </ul>
        {isVivaSelected && <PaginatedList list={vivaProperties} />}
        {isZapSelected && <PaginatedList list={zapProperties} />}
      </div>
    );
  }
}

PropertyList.defaultProps = {
  vivaProperties: [],
  zapProperties: [],
};

PropertyList.propTypes = {
  boundGetProperties: PropTypes.func.isRequired,
  vivaProperties: PropTypes.arrayOf(Object),
  zapProperties: PropTypes.arrayOf(Object),
};

const mapDispatchToProps = {
  boundGetProperties: getProperties,
};

const mapStateToProps = state => ({
  vivaProperties: getPaginatedVivaProperties(state),
  zapProperties: getPaginatedZapProperties(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PropertyList);
