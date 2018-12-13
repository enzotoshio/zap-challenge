import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProperties } from '../../redux/properties/actions';
import { getPaginatedVivaProperties } from '../../redux/properties/viva/selectors';
import { getPaginatedZapProperties } from '../../redux/properties/zap/selectors';
import PaginatedList from '../../component/PaginatedList';

class PropertyList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isVivaSelected: true,
      isZapSelected: false,
    };
  }

  componentDidMount() {
    this.props.boundGetProperties();
  }

  render() {
    const { isVivaSelected, isZapSelected } = this.state;
    const { vivaProperties, zapProperties } = this.props;

    return (
      <div className="App">
        <header className="App-header">
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
