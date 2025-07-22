// routes/coreValueRoutes.js
import express from "express";
import {
  createCoreValue,
  getAllCoreValues,
  getCoreValueById,
  updateCoreValue,
  deleteCoreValue,
} from "../controllers/coreValueController.js";
import { coreValueImageUpload } from "../middleware/best.js";

const router = express.Router();

router.post("/", coreValueImageUpload.single("image"), createCoreValue);
router.get("/", getAllCoreValues);
router.get("/:id", getCoreValueById);
router.put("/:id", coreValueImageUpload.single("image"), updateCoreValue);
router.delete("/:id", deleteCoreValue);

export default router;
