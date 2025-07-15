import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProductList from './pages/ListProduct';
import AddProduct from './pages/AddProduct';
import UpdateProduct from './pages/UpdateProduct';
import ProductDetails from './pages/ViewProduct';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/update-product/:id" element={<UpdateProduct />} />
        <Route path="/product-detail/:id" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
