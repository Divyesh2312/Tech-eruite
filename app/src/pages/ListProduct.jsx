import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { productColumns } from '../components/Columns';
import { FaSearch } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/product/list');
      setProducts(res.data.data);
      setFilteredProducts(res.data.data);
    } catch (err) {
      console.error('Failed to fetch products', err);
    }
  };

  const handleView = (id) => {
    navigate(`/product-detail/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/update-product/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`http://localhost:5000/api/product/delete/${id}`);
        toast.success('Product deleted successfully');
        fetchProducts(); 
      } catch (err) {
        toast.error('Failed to delete product');
        console.error(err);
      }
    }
  };

  const handleAddProduct = () => {
    navigate('/add-product');
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  return (
    <Box p={2} mt={2}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap={2}
        mb={2}
      >
        <Typography variant="h5" fontWeight="bold">
          Product List
        </Typography>

        <TextField
          variant="outlined"
          placeholder="Search by product name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FaSearch size={16} color="gray" />
              </InputAdornment>
            ),
          }}
          sx={{ minWidth: 250 }}
        />

        <Button variant="contained" color="primary" onClick={handleAddProduct}>
          + Add Product
        </Button>
      </Box>

      <DataTable
        columns={productColumns(handleView, handleEdit, handleDelete)}
        data={filteredProducts}
        pagination
        highlightOnHover
        responsive
        noDataComponent="No products found"
      />
    </Box>
  );
};

export default ProductList;
