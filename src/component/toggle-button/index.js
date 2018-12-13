import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function ToggleButton({ text, selected, onClick }) {
  return (
    <div
      className={`toggle-button ${selected ? 'selected' : ''}`}
      onClick={onClick}
    >
      {text}
    </div>
  );
}

ToggleButton.defaultProps = {
  text: '',
  selected: false,
  onClick: () => {},
};

ToggleButton.propTypes = {
  text: PropTypes.string,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
};

export default ToggleButton;
