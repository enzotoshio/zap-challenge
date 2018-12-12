import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProperties } from '../../redux/properties/actions';
import { getVivaPropertiesSelector } from '../../redux/properties/selectors';

class PropertyList extends Component {
  componentDidMount() {
    this.props.boundGetProperties();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Property list</p>
        </header>
      </div>
    );
  }
}

PropertyList.defaultProps = {
  vivaProperties: [],
};

PropertyList.propTypes = {
  boundGetProperties: PropTypes.func.isRequired,
  vivaProperties: PropTypes.arrayOf(Object),
};

const mapDispatchToProps = {
  boundGetProperties: getProperties,
};

const mapStateToProps = state => ({
  vivaProperties: getVivaPropertiesSelector(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PropertyList);
