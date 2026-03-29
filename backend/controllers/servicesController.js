const Service = require('../models/Service');

// GET /api/services
const getServices = async (req, res, next) => {
  try {
    const services = await Service.find().sort({ id: 1 });
    res.status(200).json({ success: true, data: services });
  } catch (error) {
    next(error);
  }
};

module.exports = { getServices };
