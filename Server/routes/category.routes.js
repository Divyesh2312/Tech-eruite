const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/category.controller");

router.get("/list", CategoryController.getAllCategories);

module.exports = router;
