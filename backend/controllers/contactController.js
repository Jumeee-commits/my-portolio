const nodemailer = require('nodemailer');
const { validationResult } = require('express-validator');
const ContactMessage = require('../models/ContactMessage');

// POST /api/contact
const sendContact = async (req, res, next) => {
  // Validate incoming data
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    return next(new Error(errors.array().map(e => e.msg).join(', ')));
  }

  const { name, email, subject, message } = req.body;

  try {
    // 1. Save message to MongoDB
    const newMessage = await ContactMessage.create({ name, email, subject, message });

    // 2. Send notification email via Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">
            New Portfolio Contact Message
          </h2>
          <table style="width:100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #555; width: 100px;">Name:</td>
              <td style="padding: 8px;">${name}</td>
            </tr>
            <tr style="background:#f9f9f9">
              <td style="padding: 8px; font-weight: bold; color: #555;">Email:</td>
              <td style="padding: 8px;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #555;">Subject:</td>
              <td style="padding: 8px;">${subject}</td>
            </tr>
          </table>
          <div style="margin-top: 20px; padding: 15px; background: #f4f6f9; border-radius: 8px;">
            <p style="font-weight:bold; color:#555; margin:0 0 8px;">Message:</p>
            <p style="margin:0; line-height:1.6; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="margin-top: 20px; font-size: 12px; color: #999;">
            Received on ${new Date().toLocaleString('en-NG', { timeZone: 'Africa/Lagos' })} (WAT)
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: 'Message sent successfully! I will get back to you soon.',
      id: newMessage._id,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/contact-info (static info)
const getContactInfo = (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      address: {
        line1: '26 aranseoluwa street, temdire estate',
        line2: 'Berger, Lagos, Nigeria',
      },
      phones: ['08185707512', '09027301755'],
      emails: ['alaomichael93@gmail.com', 'steve.mccann.ceo@gmail.com'],
    },
  });
};

module.exports = { sendContact, getContactInfo };
