import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AddProduct = () => {
  const [categoryOptions, setCategoryOptions] = useState([]);
  const navigate = useNavigate();


  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/category/list');
      setCategoryOptions(res.data.data); // assuming `data` is the array of categories
    } catch (err) {
      toast.error('Failed to load categories');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const initialValues = {
    name: '',
    description: '',
    price: '',
    quantity: '',
    categories: [],
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Product name is required'),
    description: Yup.string('description is required'),
    price: Yup.number().typeError('Must be a number').required('Price is required'),
    quantity: Yup.number().typeError('Must be a number'),
    categories: Yup.array().of(Yup.string('choose a category')).required('At least one category is required'),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const res = await axios.post('http://localhost:5000/api/product/add', values);
      toast.success(res.data.message || 'Product added successfully');
      resetForm();
      navigate('/'); 
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to add product');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5} p={3} boxShadow={3} borderRadius={2}>
        <Typography variant="h5" mb={3}>
          Add Product
        </Typography>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, handleChange, values }) => (
            <Form noValidate>
              <TextField
                fullWidth
                name="name"
                label="Product Name"
                variant="outlined"
                value={values.name}
                onChange={handleChange}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
                margin="normal"
              />

              <TextField
                fullWidth
                name="description"
                label="Description"
                variant="outlined"
                value={values.description}
                onChange={handleChange}
                error={touched.description && Boolean(errors.description)}
                helperText={touched.description && errors.description}
                margin="normal"
              />

              <TextField
                fullWidth
                name="price"
                label="Price"
                variant="outlined"
                value={values.price}
                onChange={handleChange}
                error={touched.price && Boolean(errors.price)}
                helperText={touched.price && errors.price}
                margin="normal"
              />

              <TextField
                fullWidth
                name="quantity"
                label="Quantity"
                variant="outlined"
                value={values.quantity}
                onChange={handleChange}
                error={touched.quantity && Boolean(errors.quantity)}
                helperText={touched.quantity && errors.quantity}
                margin="normal"
              />

              <TextField
                fullWidth
                select
                SelectProps={{ multiple: true }}
                name="categories"
                label="Categories"
                value={values.categories}
                onChange={handleChange}
                helperText="Hold Ctrl or Cmd to select multiple"
                margin="normal"
              >
                {categoryOptions.map((category) => (
                  <MenuItem key={category._id} value={category._id}>
                    {category.name}
                  </MenuItem>
                ))}
              </TextField>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Add Product
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default AddProduct;
