import express from "express";
import {
  createTestimonial,
  getAllTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial
} from "../controllers/testimonialController.js";

import { testimonialImageUpload } from "../middleware/testimonialImageUpload.js";

const router = express.Router();

router.post("/", testimonialImageUpload.single("image"), createTestimonial);
router.get("/", getAllTestimonials);
router.get("/:id", getTestimonialById);
router.put("/:id", testimonialImageUpload.single("image"), updateTestimonial);
router.delete("/:id", deleteTestimonial);

export default router;
