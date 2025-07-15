const CategoryModel = require("../models/category.models");


exports.getAllCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.find().sort({ name: 1 });
    res.status(200).json({
      status: "success",
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch categories",
      error: error.message,
    });
  }
};