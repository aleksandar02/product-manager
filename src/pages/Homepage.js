import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import Button from '../components/Button';

import Products from '../components/Products';
import ProductItem from '../components/ProductItem';

const Homepage = () => {
  const navigate = useNavigate();

  const [ids, setProductIds] = useState([]);
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
    const url = 'http://localhost/product-api/src/api/massDelete.php';

    const productIds = { ids: [...ids] };

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
      getProducts();
    }
  };

  const handleOnChange = (id) => {
    const exists = ids.find((productId) => productId == id);

    if (exists) {
      const filteredProductIds = ids.filter((productId) => productId != id);

      setProductIds([...filteredProductIds]);
    } else {
      console.log([...ids, id]);
      setProductIds((currentState) => [...currentState, id]);
    }
  };

  return (
    <div className='container'>
      <Header headlineText='Product List'>
        <Button
          type='button'
          onClick={() => navigate('/add-product')}
          buttonText='Add new product'
          cssStyle='blue'
        />
        <Button
          type='button'
          onClick={massDelete}
          buttonText='Mass Delete'
          cssStyle='red'
        />
      </Header>
      <p>Selected: {ids.length}</p>
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
