const Portfolio = require('../models/Portfolio');

const getPortfolio = async (req, res, next) => {
  try {
    const items = await Portfolio.find().sort({ id: 1 });
    res.status(200).json({ success: true, data: items });
  } catch (error) {
    next(error);
  }
};

const createPortfolio = async (req, res, next) => {
  try {
    const item = await Portfolio.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

const updatePortfolio = async (req, res, next) => {
  try {
    const item = await Portfolio.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ success: false, message: 'Not found' });
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

const deletePortfolio = async (req, res, next) => {
  try {
    const item = await Portfolio.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Not found' });
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};

module.exports = { getPortfolio, createPortfolio, updatePortfolio, deletePortfolio };
