import React from 'react';

const FurnitureForm = ({
  handleChange,
  heightValue,
  widthValue,
  lengthValue,
  errorHeight,
  touchedHeight,
  errorWidth,
  touchedWidth,
  errorLength,
  touchedLength,
}) => {
  return (
    <div>
      <div className='input-group'>
        <label>Height (CM)</label>
        <input
          onChange={handleChange}
          value={heightValue}
          id='height'
          name='height'
        />
        <div className='text-danger'>
          {errorHeight && touchedHeight ? errorHeight : null}
        </div>
      </div>
      <div className='input-group'>
        <label>Width (CM)</label>
        <input
          onChange={handleChange}
          value={widthValue}
          id='width'
          name='width'
        />
        <div className='text-danger'>
          {errorWidth && touchedWidth ? errorWidth : null}
        </div>
      </div>
      <div className='input-group'>
        <label>Length (CM)</label>
        <input
          onChange={handleChange}
          value={lengthValue}
          id='length'
          name='length'
        />
        <div className='text-danger'>
          {errorLength && touchedLength ? errorLength : null}
        </div>
        <p className='input-help-text'>
          Please provide dimensions in HxWxL format.
        </p>
      </div>
    </div>
  );
};

export default FurnitureForm;
