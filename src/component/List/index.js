import React from 'react';
import PropTypes from 'prop-types';

function List({ items }) {
  return items.map(item => <p key={item.id}>{item.id}</p>);
}

List.defaultProps = {
  items: [],
};

List.propTypes = {
  items: PropTypes.arrayOf(Object),
};

export default List;
