import express from 'express';
import { uploadProductImages } from '../middleware/uploadMiddleware.js';
import { createProduct, deleteProduct, getAllProducts, updateProduct, getProductById } from '../controllers/productController.js';



const router = express.Router();

router.post('/create', uploadProductImages, createProduct);
router.get("/", getAllProducts);
router.put("/:id",uploadProductImages, updateProduct);
router.delete("/:id", deleteProduct);
router.get("/:id", getProductById);
export default router ;

