import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';

import BookForm from './BookForm';
import DVDForm from './DVDForm';
import FurnitureForm from './FurnitureForm';

const initialValues = {
  sku: '',
  name: '',
  price: '',
  type: '',
  weight: '',
  width: '',
  length: '',
  height: '',
  size: '',
};

const validationSchema = Yup.object().shape(
  {
    sku: Yup.string()
      .min(8, 'SKU must be between 8-12 characters.')
      .max(12, 'SKU must be between 8-12 characters.')
      .required('Please submit required data.')
      .test('no-whitespaces', 'SKU must not have whitespaces.', (value) =>
        value?.trim().match(/^\S+$/)
      ),
    name: Yup.string().required('Please submit required data.'),
    price: Yup.number()
      .typeError('Please, provide the data of indicated type.')
      .required('Please submit required data.'),
    type: Yup.string().required('Please select the product type.'),
    weight: Yup.string()
      .ensure()
      .when('type', {
        is: '1',
        then: Yup.string()
          .required('Please submit required data.')
          .test(
            'is-decimal',
            'Please, provide the data of indicated type.',
            (value) => (value + '').match(/^\d+\.?\d{0,2}$/)
          ),
      }),
    size: Yup.string()
      .ensure()
      .when('type', {
        is: '2',
        then: Yup.string()
          .required('Please submit required data.')
          .test(
            'is-decimal',
            'Please, provide the data of indicated type.',
            (value) => (value + '').match(/^\d+\.?\d{0,2}$/)
          ),
      }),
    height: Yup.string()
      .ensure()
      .when('type', {
        is: '3',
        then: Yup.string()
          .required('Please submit required data.')
          .test(
            'is-decimal',
            'Please, provide the data of indicated type.',
            (value) => (value + '').match(/^\d+\.?\d{0,2}$/)
          ),
      }),
    width: Yup.string()
      .ensure()
      .when('type', {
        is: '3',
        then: Yup.string()
          .required('Please submit required data.')
          .test(
            'is-decimal',
            'Please, provide the data of indicated type.',
            (value) => (value + '').match(/^\d+\.?\d{0,2}$/)
          ),
      }),
    length: Yup.string()
      .ensure()
      .when('type', {
        is: '3',
        then: Yup.string()
          .required('Please submit required data.')
          .test(
            'is-decimal',
            'Please, provide the data of indicated type.',
            (value) => (value + '').match(/^\d+\.?\d{0,2}$/)
          ),
      }),
  },
  [
    ['type', 'weight'],
    ['type', 'size'],
    ['type', 'height'],
    ['type', 'width'],
    ['type', 'length'],
  ]
);

const AddProductForm = ({ saveProduct }) => {
  const [productType, setProductType] = useState(null);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: (values) => {
      let product = {
        sku: values.sku,
        name: values.name,
        price: values.price,
        type: values.type,
      };

      if (values.type == 1) {
        product = { ...product, weight: values.weight };
      } else if (values.type == 2) {
        product = { ...product, size: values.size };
      } else if (values.type == 3) {
        product = {
          ...product,
          height: values.height,
          width: values.width,
          length: values.length,
        };
      }

      saveProduct(product);
    },
  });

  return (
    <form id='product_form' onSubmit={formik.handleSubmit}>
      <div className='input-group'>
        <label>SKU</label>
        <input
          id='sku'
          name='sku'
          value={formik.values.sku}
          onChange={formik.handleChange}
        />
        <div className='text-danger'>
          {formik.errors.sku && formik.touched.sku ? formik.errors.sku : null}
        </div>
      </div>
      <div className='input-group'>
        <label>Name</label>
        <input
          id='name'
          name='name'
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        <div className='text-danger'>
          {formik.errors.name && formik.touched.name
            ? formik.errors.name
            : null}
        </div>
      </div>
      <div className='input-group'>
        <label>Price ($)</label>
        <input
          id='price'
          name='price'
          value={formik.values.price}
          onChange={formik.handleChange}
        />
        <div className='text-danger'>
          {formik.errors.price && formik.touched.price
            ? formik.errors.price
            : null}
        </div>
      </div>

      <div className='input-group'>
        <label>Product type</label>
        <select
          id='productType'
          name='type'
          defaultValue={formik.values.type}
          onChange={(e) => {
            formik.handleChange(e);
            setProductType(e.currentTarget.value);
          }}
        >
          <option disabled value=''>
            Select product type
          </option>
          <option value='1'>Book</option>
          <option value='2'>DVD</option>
          <option value='3'>Furniture</option>
        </select>
        <div className='text-danger'>
          {formik.errors.type && formik.touched.type
            ? formik.errors.type
            : null}
        </div>
      </div>

      {productType == 1 ? (
        <BookForm
          handleChange={formik.handleChange}
          value={formik.values.weight}
          errorWeight={formik.errors.weight}
          touchedWeight={formik.touched.weight}
        />
      ) : null}
      {productType == 2 ? (
        <DVDForm
          handleChange={formik.handleChange}
          value={formik.values.size}
          errorSize={formik.errors.size}
          touchedSize={formik.touched.size}
        />
      ) : null}

      {productType == 3 ? (
        <FurnitureForm
          handleChange={formik.handleChange}
          heightValue={formik.values.height}
          widthValue={formik.values.width}
          lengthValue={formik.values.length}
          errorLength={formik.errors.length}
          touchedLength={formik.touched.length}
          errorWidth={formik.errors.width}
          touchedWidth={formik.touched.width}
          errorHeight={formik.errors.height}
          touchedHeight={formik.touched.height}
        />
      ) : null}
    </form>
  );
};

export default AddProductForm;
