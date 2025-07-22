// import { categoryModel } from "../models/categoryModel.js";

// export const createCategory = async (req, res) => {
//   try {
//     const { name, description } = req.body;

//     const existing = await categoryModel.findOne({ name });
//     if (existing) {
//       return res.status(400).json({ message: "Category already exists" });
//     }

//     const imagePath = req.file ? `/uploads/categories/${req.file.filename}` : null;

//     const category = new categoryModel({
//       name,
//       description,
//       image: imagePath,
//     });

//     await category.save();

//     res.status(201).json({ message: "Category created", category });
//   } catch (err) {
//     res.status(500).json({
//       message: "Failed to create category",
//       error: err.message,
//     });
//   }
// };



// export const updateCategory = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Get data from body
//     const updates = {
//       ...req.body,
//     };

//     // ✅ If a new image was uploaded, include it in updates
//     if (req.file) {
//       // For local multer
//       updates.image = `/uploads/categories/${req.file.filename}`;

//       // Or for S3:
//       // updates.image = req.file.location;
//     }

//     const category = await categoryModel.findByIdAndUpdate(id, updates, {
//       new: true,
//     });

//     if (!category) {
//       return res.status(404).json({ message: "Category not found" });
//     }

//     res.status(200).json({ message: "Category updated", category });
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "Failed to update category", error: err.message });
//   }
// };


// // @desc    Delete a category
// export const deleteCategory = async (req, res) => {
//     try {
//         const { id } = req.params;

//         const category = await categoryModel.findByIdAndDelete(id);

//         if (!category) {
//             return res.status(404).json({ message: "Category not found" });
//         }

//         res.status(200).json({ message: "Category deleted", category });
//     } catch (err) {
//         res.status(500).json({ message: "Failed to delete category", error: err.message });
//     }
// };


// export const getAllCategories = async (req, res) => {
//     try {
//         const categories = await categoryModel.find();
//         res.status(200).json(categories);
//     } catch (err) {
//         res.status(500).json({ message: "Failed to fetch categories", error: err.message });
//     }
// };
import { categoryModel } from "../models/categoryModel.js";

// @desc    Create a new category
export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    const existing = await categoryModel.findOne({ name });
    if (existing) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const imagePath = req.file ? `/uploads/categories/${req.file.filename}` : null;

    const category = new categoryModel({
      name,
      description,
      image: imagePath,
    });

    await category.save();

    res.status(201).json({ message: "Category created", category });
  } catch (err) {
    res.status(500).json({
      message: "Failed to create category",
      error: err.message,
    });
  }
};

// @desc    Update a category
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const updates = { ...req.body };

    if (req.file) {
      updates.image = `/uploads/categories/${req.file.filename}`;
    }

    const category = await categoryModel.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category updated", category });
  } catch (err) {
    res.status(500).json({
      message: "Failed to update category",
      error: err.message,
    });
  }
};

// @desc    Delete a category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await categoryModel.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted", category });
  } catch (err) {
    res.status(500).json({
      message: "Failed to delete category",
      error: err.message,
    });
  }
};

// @desc    Get all categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch categories",
      error: err.message,
    });
  }
};

// ✅ @desc    Get a category by ID
export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await categoryModel.findById(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch category",
      error: err.message,
    });
  }
};
