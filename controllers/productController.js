// import productModel from "../models/productModel.js";

import productModel from "../models/productModel.js";

import path from 'path';
import fs from 'fs';


export const createProduct = async (req, res) => {
  try {
    const {
      name,
      brand,
      category,
      model,
      sku,
      price,
      discount,
      stock,
      warranty,
      features,
      specifications,
      usage,
      status,
    } = req.body;

    // Parse incoming values
    const featuresArray = features ? JSON.parse(features) : [];
    const specsObject = specifications ? JSON.parse(specifications) : {};

    // If using multer for file upload
     if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "At least one image is required." });
    }

   const images = req.files.map(file => ({
  url: `/uploads/images/${file.filename}`,
  public_id: file.filename,
}));


    // Check for duplicate SKU
    const existing = await productModel.findOne({ sku });
    if (existing) {
      return res.status(400).json({ message: "SKU already exists" });
    }

    const product = await productModel.create({
      name,
      brand,
      category,
      model,
      sku,
      price: parseFloat(price),
      discount: parseFloat(discount) || 0,
      stock: parseInt(stock),
      warranty,
      features: featuresArray,
      specifications: specsObject,
      usage,
      images,
      status: status || "Active",
    });

    res.status(201).json({ success: true, message: "Product created", data: product });
  } catch (err) {
    console.error("Error creating medical hardware:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// export const getAllProducts = async (req, res) => {
//   try {
//     // Parse pagination query params (with defaults)
//     const page = parseInt(req.query.page) || 1; // current page
//     const pageSize = parseInt(req.query.pageSize) || 10; // items per page

//     const skip = (page - 1) * pageSize;

//     // Fetch total product count for frontend use
//     const total = await productModel.countDocuments();

//     // Fetch paginated products
//     const products = await productModel
//       .find()
//       .skip(skip)
//       .limit(pageSize)
//       .sort({ createdAt: -1 }); // Optional: latest first

//     res.status(200).json({
//       total,
//       page,
//       pageSize,
//       totalPages: Math.ceil(total / pageSize),
//       products,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Failed to fetch products",
//       error: error.message,
//     });
//   }
// };
export const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find().sort({ createdAt: -1 }); // Optional: latest first

    res.status(200).json({
      total: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch products",
      error: error.message,
    });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Admin
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };

    // If new image files are uploaded
    if (req.files && req.files.length > 0) {
      updates.images = req.files.map(file => ({
        url: `/uploads/images/${file.filename}`,
      }));
    }

    const updatedProduct = await productModel.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product updated", product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: "Failed to update product", error: error.message });
  }
};


// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Admin
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await productModel.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully", product: deletedProduct });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product", error: error.message });
  }
};
// @desc    Get a single product by ID
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productModel.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    res.status(500).json({ message: "Failed to fetch product", error: error.message });
  }
};
