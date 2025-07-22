// routes/missionRoutes.js
import express from "express";
import {
  createMission,
  getAllMissions,
  getMissionById,
  updateMission,
  deleteMission,
} from "../controllers/missionController.js";
import { missionImageUpload } from "../middleware/uploadMission.js";

const router = express.Router();

router.post("/", missionImageUpload.single("image"), createMission);
router.get("/", getAllMissions);
router.get("/:id", getMissionById);
router.put("/:id", missionImageUpload.single("image"), updateMission);
router.delete("/:id", deleteMission);

export default router;
