import React from 'react';

const DVDForm = ({ handleChange, value, errorSize, touchedSize }) => {
  return (
    <div className='input-group'>
      <label>Size (MB)</label>
      <input onChange={handleChange} value={value} id='size' name='size' />
      <div className='text-danger'>
        {errorSize && touchedSize ? errorSize : null}
      </div>
      <p className='input-help-text'>Please provide size in MB.</p>
    </div>
  );
};

export default DVDForm;
