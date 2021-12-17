import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './button.scss';

const Button = (props) => {
  return (
    <button
      className={`btn ${props.className}`}
      onClick={props.onClick ? () => props.onClick() : null}
    >
      {props.children}
    </button>
  );
};

export const OutlineButton = (props) => {
  return (
    <Button
      className={`btn-outline ${props.className}`}
      onClick={props.onClick ? () => props.onClick() : null}
    >
      {props.children}
    </Button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
};

export const OutlineButtonToggle = (props) => {
  const [isActive, setIsActive] = useState(false);

  const handleOnClick = () => {
    setIsActive(!isActive);
    if (props.onClick) {
      props.onClick(props.children);
    }
  };

  return (
    <Button
      className={`btn-outline ${props.className} ${
        isActive && 'btn-outline-active'
      }`}
      onClick={handleOnClick}
    >
      {props.children}
    </Button>
  );
};

export default Button;
