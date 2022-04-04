import React from 'react';

const ProductItem = ({ product, handleOnChange }) => {
  let displayAttribute = <p>Weight: {product.weight}KG</p>;

  if (product.type == 2) {
    displayAttribute = <p>Size: {product.size}MB</p>;
  } else if (product.type == 3) {
    displayAttribute = (
      <p>
        Dimensions: {product.height}x{product.width}x{product.length}
      </p>
    );
  }

  return (
    <div className='product-item'>
      <span>{product.sku}</span>
      <h2>{product.name}</h2>
      {displayAttribute}
      <p className='product-item-price'>${product.price}</p>

      <input
        type='checkbox'
        className='delete-checkbox'
        onChange={() => handleOnChange(product.id)}
      />
    </div>
  );
};

export default ProductItem;
