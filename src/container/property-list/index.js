import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { getProperties } from '../../redux/properties/actions';
import { getPaginatedVivaProperties } from '../../redux/properties/viva/selectors';
import { getPaginatedZapProperties } from '../../redux/properties/zap/selectors';
import PaginatedList from '../../component/PaginatedList';

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
      <div className="App">
        <header className="App-header">
          <ul>
            <li onClick={() => this.selectList('viva')}>Viva</li>
            <li onClick={() => this.selectList('zap')}>Zap</li>
          </ul>
          <p>Property list</p>
          {isVivaSelected && <PaginatedList list={vivaProperties} />}
          {isZapSelected && <PaginatedList list={zapProperties} />}
        </header>
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
