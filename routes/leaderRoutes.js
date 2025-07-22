// routes/leaderRoutes.js
import express from "express";
import {
  createLeader,
  getAllLeaders,
  getLeaderById,
  updateLeader,
  deleteLeader
} from "../controllers/leaderController.js";
import { leaderImageUpload } from "../middleware/best1.js";

const router = express.Router();

router.post("/", leaderImageUpload.single("image"), createLeader);
router.get("/", getAllLeaders);
router.get("/:id", getLeaderById);
router.put("/:id", leaderImageUpload.single("image"), updateLeader);
router.delete("/:id", deleteLeader);

export default router;
