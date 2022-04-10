import { useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import Button from '../components/Button';
import AddProductForm from '../components/AddProductForm';

const AddProductPage = () => {
  const navigate = useNavigate();

  const save = async (product) => {
    const url =
      'https://product-api-solution.000webhostapp.com/productapi/api/create.php';

    const response = await fetch(url, {
      method: 'POST',
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });

    const result = await response.json();

    if (result.success) {
      navigate('/');
    } else {
      console.log(result.message);
    }
  };

  return (
    <div>
      <Header headlineText='Add Product'>
        <Button
          type='submit'
          buttonText='Save'
          cssStyle='blue'
          formId='product_form'
        />
        <Button
          type='button'
          onClick={() => navigate('/')}
          buttonText='Cancel'
          cssStyle='cancel-btn'
        />
      </Header>
      <div className='container'>
        <h1 className='form-title'>Add product form</h1>
        <p className='form-subtitle'>
          Fill in all the neccessary fields to add the new product.
        </p>
        <AddProductForm saveProduct={save} />
      </div>
    </div>
  );
};

export default AddProductPage;
