import React from 'react';

const Button = ({ onClick, buttonText, cssStyle, type }) => {
  return (
    <button type={type} onClick={onClick} className={cssStyle}>
      {buttonText}
    </button>
  );
};

export default Button;
