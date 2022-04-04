import Header from '../components/Header';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

const AddProductPage = () => {
  const navigate = useNavigate();

  const save = () => {};

  return (
    <div className='container'>
      <Header headlineText='Add Product'>
        <Button
          type='button'
          onClick={save}
          buttonText='Save'
          cssStyle='blue'
        />
        <Button
          type='button'
          onClick={() => navigate('/')}
          buttonText='Cancel'
          cssStyle='cancel-btn'
        />
      </Header>
    </div>
  );
};

export default AddProductPage;
