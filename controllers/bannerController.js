// controllers/bannerController.js
import Banner from '../models/bannerModel.js';
import fs from 'fs';
import path from 'path';

export const createBanner = async (req, res) => {
  try {
    const { title, description, cta } = req.body;
    const image = req.file?.filename;

    if (!title || !description || !cta || !image) {
      return res.status(400).json({ message: 'All fields including image are required.' });
    }

    const banner = await Banner.create({ title, description, cta, image });
    res.status(201).json(banner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllBanners = async (req, res) => {
  try {
    const banners = await Banner.find().sort({ createdAt: -1 });
    res.json(banners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBannerById = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) return res.status(404).json({ message: 'Banner not found' });
    res.json(banner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBanner = async (req, res) => {
  try {
    const { title, description, cta } = req.body;
    const banner = await Banner.findById(req.params.id);
    if (!banner) return res.status(404).json({ message: 'Banner not found' });

    if (req.file) {
      const oldPath = path.join('uploads/images', banner.image);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      banner.image = req.file.filename;
    }

    banner.title = title || banner.title;
    banner.description = description || banner.description;
    banner.cta = cta || banner.cta;

    await banner.save();
    res.json(banner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) return res.status(404).json({ message: 'Banner not found' });

    const imagePath = path.join('uploads/images', banner.image);
    if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);

    await banner.deleteOne();
    res.json({ message: 'Banner deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
