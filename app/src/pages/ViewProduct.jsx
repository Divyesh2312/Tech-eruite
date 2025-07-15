import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Chip,
  Divider,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';
import toast from 'react-hot-toast';

const ViewProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/product/detail/${id}`);
      setProduct(res.data.data);
    } catch (err) {
      toast.error('Failed to fetch product');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <Container maxWidth="sm">
        <Box textAlign="center" mt={10}>
          <CircularProgress />
          <Typography mt={2}>Loading product...</Typography>
        </Box>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container maxWidth="sm">
        <Box textAlign="center" mt={10}>
          <Typography variant="h6" color="error">
            Product not found.
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box mt={5} p={3} boxShadow={3} borderRadius={2}>
        <Typography variant="h5" gutterBottom>
          Product Details
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Typography variant="subtitle1"><strong>Name:</strong> {product.name}</Typography>
        <Typography variant="subtitle1"><strong>Description:</strong> {product.description || 'N/A'}</Typography>
        <Typography variant="subtitle1"><strong>Price:</strong> ₹{product.price}</Typography>
        <Typography variant="subtitle1"><strong>Quantity:</strong> {product.quantity || 'N/A'}</Typography>

        <Typography variant="subtitle1" mt={2}><strong>Categories:</strong></Typography>
        <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
          {product.categories?.map((cat) => (
            <Chip key={cat._id} label={cat.name} variant="outlined" />
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default ViewProduct;
