import React from 'react';

const Button = ({ onClick, buttonText, cssStyle, type, buttonId, formId }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cssStyle}
      id={buttonId}
      form={formId}
    >
      {buttonText}
    </button>
  );
};

export default Button;
