import { useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import Button from '../components/Button';
import AddProductForm from '../components/AddProductForm';

const AddProductPage = () => {
  const navigate = useNavigate();

  const save = async (product) => {
    const url = 'http://localhost/product-api/src/api/create.php';

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
    <div className='container'>
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
      <AddProductForm saveProduct={save} />
    </div>
  );
};

export default AddProductPage;
