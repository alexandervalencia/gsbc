import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ type, ...props }) => (
  <button type={type}>{props.children}</button>
);

Button.defaultProps = {
  type: 'button',
};

Button.propTypes = {
  type: PropTypes.string,
};

export default Button;
