import Testimonial from "../models/Testimonial.js";

// CREATE
export const createTestimonial = async (req, res) => {
  try {
    const { name, role, feedback, rating } = req.body;
    const image = req.file ? req.file.filename : null;

    const newTestimonial = new Testimonial({ name, role, feedback, rating, image });
    await newTestimonial.save();
    res.status(201).json({ message: "Testimonial created", testimonial: newTestimonial });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL
export const getAllTestimonials = async (req, res) => {
  try {
    const data = await Testimonial.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET BY ID
export const getTestimonialById = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) return res.status(404).json({ message: "Not found" });
    res.json(testimonial);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE
export const updateTestimonial = async (req, res) => {
  try {
    const { name, role, feedback, rating } = req.body;
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) return res.status(404).json({ message: "Not found" });

    testimonial.name = name || testimonial.name;
    testimonial.role = role || testimonial.role;
    testimonial.feedback = feedback || testimonial.feedback;
    testimonial.rating = rating || testimonial.rating;

    if (req.file) testimonial.image = req.file.filename;

    await testimonial.save();
    res.json({ message: "Updated", testimonial });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE
export const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted", testimonial });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
