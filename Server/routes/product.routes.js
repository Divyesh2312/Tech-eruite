const express = require('express');
const router = express.Router();
const PorductController = require('../controllers/product.controller');

router.post('/add', PorductController.addProduct);
router.get('/list', PorductController.getAllProducts);
router.get('/detail/:id', PorductController.getProductById);
router.put('/update/:id', PorductController.updateProduct);    
router.delete('/delete/:id', PorductController.deleteProduct);

module.exports = router;