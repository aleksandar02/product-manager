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
      const data = await fetch(
        'https://product-api-solution.000webhostapp.com/productapi/api/read.php'
      );
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
        const url =
          'https://product-api-solution.000webhostapp.com/productapi/api/massDelete.php';

        const productIds = { ids: [...selectedIds] };

        const response = await fetch(url, {
          method: 'POST',
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

  const filteredProducts = products.sort((a, b) => {
    return b.id - a.id;
  });

  return (
    <div>
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
      <div className='container'>
        <p>Selected: {selectedIds.length}</p>
        <Products>
          {filteredProducts.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              handleOnChange={handleOnChange}
            />
          ))}
        </Products>
      </div>
    </div>
  );
};

export default Homepage;
