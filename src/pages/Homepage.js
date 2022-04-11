import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import Button from '../components/Button';

import Products from '../components/Products';
import ProductItem from '../components/ProductItem';

const Homepage = () => {
  const navigate = useNavigate();

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
    const checkboxes = document.querySelectorAll('.delete-checkbox');
    let selectedIds = [];

    checkboxes.forEach((c) => {
      selectedIds = [...selectedIds, c.getAttribute('data-product-id')];
    });

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
          let filteredProducts = products.filter(
            (p) => !selectedIds.includes(p.id)
          );

          setProducts(filteredProducts);
        }
      } catch (err) {
        console.log('Something went wrong!');
      }
    } else {
      console.log('No products selected!');
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
        {filteredProducts.length > 0 ? (
          <Products>
            {filteredProducts.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </Products>
        ) : (
          <p>There are no products to show!</p>
        )}
      </div>
    </div>
  );
};

export default Homepage;
