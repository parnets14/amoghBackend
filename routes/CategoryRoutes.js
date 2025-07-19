import express from "express";

import { createCategory, deleteCategory, getAllCategories, updateCategory } from "../controllers/categoryController.js";
import { uploadCategoryImage } from "../middleware/categoryUpload.js";


const categoryRoutes = express.Router();

categoryRoutes.get("/", getAllCategories);
categoryRoutes.post("/", uploadCategoryImage, createCategory); 
categoryRoutes.put("/:id",uploadCategoryImage, updateCategory);
categoryRoutes.delete("/:id", deleteCategory);

export default categoryRoutes;
