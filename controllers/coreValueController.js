// controllers/coreValueController.js
import CoreValue from "../models/coreValueModel.js";
import fs from "fs";
import path from "path";

// Create
export const createCoreValue = async (req, res) => {
  try {
    const { title, description } = req.body;
    const imagePath = req.file ? `/uploads/core-values/${req.file.filename}` : "";

    const newValue = new CoreValue({ title, description, image: imagePath });
    await newValue.save();
    res.status(201).json(newValue);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All
export const getAllCoreValues = async (req, res) => {
  try {
    const values = await CoreValue.find().sort({ createdAt: -1 });
    res.json(values);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get by ID
export const getCoreValueById = async (req, res) => {
  try {
    const value = await CoreValue.findById(req.params.id);
    if (!value) return res.status(404).json({ error: "Not found" });
    res.json(value);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
export const updateCoreValue = async (req, res) => {
  try {
    const { title, description } = req.body;
    const value = await CoreValue.findById(req.params.id);
    if (!value) return res.status(404).json({ error: "Not found" });

    value.title = title || value.title;
    value.description = description || value.description;

    // Replace image if new image is uploaded
    if (req.file) {
      if (value.image) {
        const oldPath = path.join("uploads", "core-values", path.basename(value.image));
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      value.image = `/uploads/core-values/${req.file.filename}`;
    }

    await value.save();
    res.json(value);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete
export const deleteCoreValue = async (req, res) => {
  try {
    const value = await CoreValue.findById(req.params.id);
    if (!value) return res.status(404).json({ error: "Not found" });

    // Delete image from disk
    if (value.image) {
      const filePath = path.join("uploads", "core-values", path.basename(value.image));
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await value.deleteOne();
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
