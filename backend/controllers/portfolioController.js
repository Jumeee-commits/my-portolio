const Portfolio = require('../models/Portfolio');

// GET /api/portfolio
const getPortfolio = async (req, res, next) => {
  try {
    const items = await Portfolio.find().sort({ id: 1 });
    res.status(200).json({ success: true, data: items });
  } catch (error) {
    next(error);
  }
};

module.exports = { getPortfolio };
