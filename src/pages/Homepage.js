import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import Button from '../components/Button';

import Products from '../components/Products';
import ProductItem from '../components/ProductItem';

const Homepage = () => {
  const navigate = useNavigate();

  const [selectedIds, setSelectedIds] = useState([]);
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const data = await fetch('http://localhost/product-api/src/api/read.php');
      const json = await data.json();

      setProducts([...json]);
    } catch (err) {
      console.log('Error', err);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const massDelete = async () => {
    if (selectedIds.length > 0) {
      try {
        const url = 'http://localhost/product-api/src/api/massDelete.php';

        const productIds = { ids: [...selectedIds] };

        const response = await fetch(url, {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productIds),
        });

        const result = await response.json();

        if (result.success) {
          await getProducts();
          setSelectedIds([]);
        }
      } catch (err) {
        console.log('Something went wrong!');
      }
    } else {
      console.log('No products selected!');
    }
  };

  const handleOnChange = (id) => {
    const exists = selectedIds.find((productId) => productId == id);

    if (exists) {
      const filteredProductIds = selectedIds.filter(
        (productId) => productId != id
      );

      setSelectedIds([...filteredProductIds]);
    } else {
      console.log([...selectedIds, id]);
      setSelectedIds((currentState) => [...currentState, id]);
    }
  };

  return (
    <div className='container'>
      <Header headlineText='Product List'>
        <Button
          type='button'
          onClick={() => navigate('/add-product')}
          buttonText='ADD'
          cssStyle='blue'
        />
        <Button
          type='button'
          onClick={massDelete}
          buttonText='MASS DELETE'
          cssStyle='red'
          buttonId='delete-product-btn'
        />
      </Header>
      <p>Selected: {selectedIds.length}</p>
      <Products>
        {products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            handleOnChange={handleOnChange}
          />
        ))}
      </Products>
    </div>
  );
};

export default Homepage;
