const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { sendContact, getContactInfo } = require('../controllers/contactController');

const contactValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').trim().isEmail().withMessage('Valid email is required'),
  body('subject').trim().notEmpty().withMessage('Subject is required'),
  body('message').trim().isLength({ min: 10 }).withMessage('Message must be at least 10 characters'),
];

router.get('/info', getContactInfo);
router.post('/', contactValidation, sendContact);

module.exports = router;
