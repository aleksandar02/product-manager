import React from 'react';

const Button = ({ onClick, buttonText, cssStyle, type, buttonId }) => {
  return (
    <button type={type} onClick={onClick} className={cssStyle} id={buttonId}>
      {buttonText}
    </button>
  );
};

export default Button;
