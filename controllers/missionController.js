// controllers/missionController.js
import Mission from "../models/Mission.js";
import fs from "fs";
import path from "path";

// Create Mission
export const createMission = async (req, res) => {
  try {
    const { title, description, points } = req.body;
    const newMission = new Mission({
      title,
      description,
      points: JSON.parse(points),
      image: req.file ? `/uploads/missions/${req.file.filename}` : "",
    });
    await newMission.save();
    res.status(201).json(newMission);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All Missions
export const getAllMissions = async (req, res) => {
  try {
    const missions = await Mission.find().sort({ createdAt: -1 });
    res.json(missions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Mission by ID
export const getMissionById = async (req, res) => {
  try {
    const mission = await Mission.findById(req.params.id);
    if (!mission) return res.status(404).json({ error: "Mission not found" });
    res.json(mission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Mission
export const updateMission = async (req, res) => {
  try {
    const mission = await Mission.findById(req.params.id);
    if (!mission) return res.status(404).json({ error: "Mission not found" });

    const { title, description, points } = req.body;
    if (title) mission.title = title;
    if (description) mission.description = description;
    if (points) mission.points = JSON.parse(points);

    if (req.file) {
      if (mission.image) {
        const oldPath = path.join("uploads", "missions", path.basename(mission.image));
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      mission.image = `/uploads/missions/${req.file.filename}`;
    }

    await mission.save();
    res.json(mission);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Mission
export const deleteMission = async (req, res) => {
  try {
    const mission = await Mission.findById(req.params.id);
    if (!mission) return res.status(404).json({ error: "Mission not found" });

    if (mission.image) {
      const filePath = path.join("uploads", "missions", path.basename(mission.image));
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await mission.deleteOne();
    res.json({ message: "Mission deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
