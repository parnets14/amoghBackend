// controllers/leaderController.js
import Leader from "../models/leaderModel.js";
import fs from "fs";
import path from "path";

// CREATE
export const createLeader = async (req, res) => {
  try {
    const { name, role, bio } = req.body;
    const image = req.file ? `/uploads/leaders/${req.file.filename}` : "";
    const leader = new Leader({ name, role, bio, image });
    await leader.save();
    res.status(201).json(leader);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ALL
export const getAllLeaders = async (req, res) => {
  try {
    const leaders = await Leader.find().sort({ createdAt: -1 });
    res.json(leaders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ BY ID
export const getLeaderById = async (req, res) => {
  try {
    const leader = await Leader.findById(req.params.id);
    if (!leader) return res.status(404).json({ error: "Leader not found" });
    res.json(leader);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
export const updateLeader = async (req, res) => {
  try {
    const leader = await Leader.findById(req.params.id);
    if (!leader) return res.status(404).json({ error: "Leader not found" });

    const { name, role, bio } = req.body;
    if (name) leader.name = name;
    if (role) leader.role = role;
    if (bio) leader.bio = bio;

    if (req.file) {
      if (leader.image) {
        const oldPath = path.join("uploads", "leaders", path.basename(leader.image));
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      leader.image = `/uploads/leaders/${req.file.filename}`;
    }

    await leader.save();
    res.json(leader);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
export const deleteLeader = async (req, res) => {
  try {
    const leader = await Leader.findById(req.params.id);
    if (!leader) return res.status(404).json({ error: "Leader not found" });

    if (leader.image) {
      const imagePath = path.join("uploads", "leaders", path.basename(leader.image));
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    await leader.deleteOne();
    res.json({ message: "Leader deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
