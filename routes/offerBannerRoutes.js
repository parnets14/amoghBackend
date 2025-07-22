import express from "express";
import {
  createOffer,
  getAllOffers,
  getOfferById,
  updateOffer,
  deleteOffer
} from "../controllers/offerBannerController.js";
import { offerImageUpload } from "../middleware/offerImageUploadMiddleware.js.js";

const router = express.Router();

router.post("/", offerImageUpload.single("image"), createOffer);
router.get("/", getAllOffers);
router.get("/:id", getOfferById);
router.put("/:id", offerImageUpload.single("image"), updateOffer);
router.delete("/:id", deleteOffer);

export default router;
