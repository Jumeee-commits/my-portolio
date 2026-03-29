const jwt = require('jsonwebtoken');

const loginAdmin = (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    res.status(400);
    return next(new Error('Please provide a password'));
  }

  if (password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });
    res.status(200).json({ success: true, token });
  } else {
    res.status(401);
    return next(new Error('Invalid password'));
  }
};

module.exports = { loginAdmin };
