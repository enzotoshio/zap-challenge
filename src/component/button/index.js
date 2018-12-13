import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Button({ text, disabled, onClick }) {
  return (
    <div className={`button ${disabled ? 'disabled' : ''}`} onClick={onClick}>
      {text}
    </div>
  );
}

Button.defaultProps = {
  text: '',
  disabled: false,
  onClick: () => {},
};

Button.propTypes = {
  text: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Button;
