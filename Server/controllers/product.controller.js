const ProductModel = require("../models/product.models");
const Helper = require("../helper/index");
const niv = require("node-input-validator");
const CatagoryModel = require("../models/category.models")



exports.addProduct = async (req, res) => {  
    const validator = new niv.Validator(req.body, {
        name: "required|string",    
        description: "string",
        price: "required|numeric",
        quantity: "numeric",
});

    const matched = await validator.check();
    if (!matched) {
        return res.status(400).json({
            status: "error",
            message: "Validation failed",
            errors: validator.errors,
        });
    }

    try {
        const product = new ProductModel(req.body);
        const savedProduct = await product.save();
        res.status(201).json({
            status: "success",
            message: "Product added successfully",
            data: savedProduct,
        });
    } catch (error) {
        await Helper.writeErrorLog(req, error);
        res.status(500).json({
            status: "error",
            message: "Internal server error",
            error: error.message,
        });
    }
}


exports.getAllProducts = async (req, res) => {
    let { page, limit, search, categories } = req.query;

    if ([1, "", 0, "undefined", "null", undefined, null].includes(page)) {
        page = 1;
    }
    if (["", "undefined", "null", undefined, null].includes(search)) {
        search = "";
    }
    if ([1, "", 0, "undefined", "null", undefined, null].includes(limit)) {
        limit = 10;
    }

    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        populate: "categories",
        sort: { createdAt: -1 }, 
    };

    let matchObj = {};

    if (search && search.trim() !== "") {
        matchObj.name = { $regex: search.trim(), $options: "i" };
    }

    if (categories) {
        const categoryArray = categories.split(",");
        matchObj.categories = { $in: categoryArray };
    }

    try {
        const result = await ProductModel.paginate(matchObj, options);

        res.status(200).json({
            status: "success",
            message: "Products fetched successfully",
            data: result.docs,
            total: result.totalDocs,
            totalPages: result.totalPages,
            currentPage: result.page,
        });
    } catch (error) {
        await Helper.writeErrorLog(req, error);
        res.status(500).json({
            status: "error",
            message: "Internal server error",
            error: error.message,
        });
    }
};
  


exports.getProductById = async (req, res) => {
    const productId = req.params.id;

    try {
        const product = await ProductModel.findById(productId).populate('categories');
        if (!product) {
            return res.status(404).json({
                status: "error",
                message: "Product not found",
            });
        }
        res.status(200).json({
            status: "success",
            message: "Product retrieved successfully",
            data: product,
        });
    } catch (error) {
        await Helper.writeErrorLog(req, error);
        res.status(500).json({
            status: "error",
            message: "Internal server error",
            error: error.message,
        });
    }
}


exports.updateProduct = async (req, res) => {
    const productId = req.params.id;

    try {
        const updatedProduct = await ProductModel.findByIdAndUpdate(productId, req.body, { new: true }).populate('categories'); 
        if (!updatedProduct) {
            return res.status(404).json({
                status: "error",
                message: "Product not found",
            });
        }
        res.status(200).json({
            status: "success",
            message: "Product updated successfully",
            data: updatedProduct,
        });
    } catch (error) {
        await Helper.writeErrorLog(req, error);     
        res.status(500).json({
            status: "error",
            message: "Internal server error",
            error: error.message,
        });
    }
}

exports.deleteProduct = async (req, res) => {
    const productId = req.params.id;

    try {
        const deletedProduct = await ProductModel.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({
                status: "error",
                message: "Product not found",
            });
        }
        res.status(200).json({
            status: "success",
            message: "Product deleted successfully",
        });
    } catch (error) {
        await Helper.writeErrorLog(req, error);
        res.status(500).json({
            status: "error",
            message: "Internal server error",
            error: error.message,
        });
    }
}