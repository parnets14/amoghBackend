import Offer from "../models/offer.js";

// CREATE
export const createOffer = async (req, res) => {
  try {
    const { title, description, cta } = req.body;
    const image = req.file ? req.file.filename : null;

    const newOffer = new Offer({ title, description, cta, image });
    await newOffer.save();
    res.status(201).json({ message: "Offer created", offer: newOffer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// READ ALL
export const getAllOffers = async (req, res) => {
  try {
    const offers = await Offer.find().sort({ createdAt: -1 });
    res.json(offers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// READ BY ID
export const getOfferById = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);
    if (!offer) return res.status(404).json({ message: "Offer not found" });
    res.json(offer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE
export const updateOffer = async (req, res) => {
  try {
    const { title, description, cta } = req.body;
    const offer = await Offer.findById(req.params.id);
    if (!offer) return res.status(404).json({ message: "Offer not found" });

    offer.title = title || offer.title;
    offer.description = description || offer.description;
    offer.cta = cta || offer.cta;

    if (req.file) {
      offer.image = req.file.filename;
    }

    await offer.save();
    res.json({ message: "Offer updated", offer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE
export const deleteOffer = async (req, res) => {
  try {
    const offer = await Offer.findByIdAndDelete(req.params.id);
    if (!offer) return res.status(404).json({ message: "Offer not found" });
    res.json({ message: "Offer deleted", offer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
