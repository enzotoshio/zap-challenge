import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import './style.css';

export function List({ items, history, children }) {
  const listItems = items.map(item => (
    <li
      className="list-item"
      key={item.id}
      onClick={() => history.push(`/property/${item.id}`)}
    >
      {React.cloneElement(children, item)}
    </li>
  ));

  return <ul className="list">{listItems}</ul>;
}

List.defaultProps = {
  items: [],
};

List.propTypes = {
  items: PropTypes.arrayOf(Object),
  children: PropTypes.node.isRequired,
};

export default withRouter(List);
