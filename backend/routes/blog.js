const express = require('express');
const router = express.Router();
const { getBlog } = require('../controllers/blogController');

router.get('/', getBlog);

module.exports = router;
