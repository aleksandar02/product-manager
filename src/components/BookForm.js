import React from 'react';

const BookForm = ({ handleChange, value, errorWeight, touchedWeight }) => {
  return (
    <div className='input-group'>
      <label>Weight (KG)</label>
      <input onChange={handleChange} value={value} id='weight' name='weight' />
      <div className='text-danger'>
        {errorWeight && touchedWeight ? errorWeight : null}
      </div>
      <p className='input-help-text'>Please provide weight in KG.</p>
    </div>
  );
};

export default BookForm;
